<script lang="ts">
  import { goto } from '$app/navigation';
  import type { PageData } from './$types.js';

  import { projectStatusOptions } from '~/lib/constans.js';
  import FormInput from '~/components/form/FormInput.svelte';
  import Button from '~/components/ui/Button.svelte';
  import FormTextArea from '~/components/form/FormTextArea.svelte';
  import FormSelect from '~/components/form/FormSelect.svelte';
  import ProjectChecklist from '~/components/ProjectChecklist.svelte';

  export let data: PageData;

  let loading = false;
  let error: string | null = null;

  const handleSubmit = async () => {
    loading = true;
    error = null;

    const res = await fetch(`/dashboard/projects/${data.project.id}/edit`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.project.name,
        description: data.project.description,
        status: data.project.status,
      }),
    });

    loading = false;

    if (!res.ok) {
      error = await res.text();
    } else {
      goto('/dashboard');
    }
  };
</script>

<form
  on:submit|preventDefault={handleSubmit}
  class="space-y-4 max-w-2xl mx-auto mt-10 flex flex-col gap-3"
>
  <h1 class="text-2xl font-bold">Edit "{data.project.name}"</h1>
  <FormInput
    bind:value={data.project.name}
    name="name"
    label="Project name"
    placeholder="John's project"
    required
  />
  <FormTextArea
    bind:value={data.project.description}
    name="description"
    label="Description"
    placeholder="Description (optional)"
    rows={6}
  />
  <ProjectChecklist />
  <FormSelect
    label="Status"
    bind:value={data.project.status}
    options={Object.entries(projectStatusOptions).map(([value, { label }]) => ({ value, label }))}
  />
  <div class="flex flex-col sm:flex-row sm:items-center gap-2">
    <Button type="submit" label={loading ? 'Saving...' : 'Update Project'} disabled={loading} />
    <Button
      label="Cancel"
      variant="secondary"
      disabled={loading}
      onClick={() => goto('/dashboard')}
    />
  </div>
  {#if error}
    <p class="text-red-500 mt-2">{error}</p>
  {/if}
</form>
