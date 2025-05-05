<script lang="ts">
  import { goto } from '$app/navigation';
  import type { PageData } from './$types.js';

  import { projectStatusOptions } from '~/lib/constans.js';
  import FormInput from '~/components/form/FormInput.svelte';
  import Button from '~/components/ui/Button.svelte';
  import FormTextArea from '~/components/form/FormTextArea.svelte';
  import FormSelect from '~/components/form/FormSelect.svelte';

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

<form on:submit|preventDefault={handleSubmit} class="space-y-4 max-w-md mx-auto mt-10">
  <h1 class="text-2xl font-bold">Edit "{data.project.name}"</h1>
  <FormInput bind:value={data.project.name} placeholder="Project name" required />
  <FormTextArea bind:value={data.project.description} placeholder="Description (optional)" />
  <FormSelect
    bind:value={data.project.status}
    options={Object.entries(projectStatusOptions).map(([value, { label }]) => ({ value, label }))}
  />
  <Button type="submit" label={loading ? 'Saving...' : 'Update Project'} disabled={loading} />
  <Button
    label="Cancel"
    variant="secondary"
    disabled={loading}
    onClick={() => goto('/dashboard')}
  />
  {#if error}
    <p class="text-red-500 mt-2">{error}</p>
  {/if}
</form>
