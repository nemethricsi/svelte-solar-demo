<script lang="ts">
  import { goto } from '$app/navigation';
  import type { DashboardLayoutData } from '~/types/auth.js';
  import { supabase } from '~/lib/supabaseClient.js';
  import { projectStatusOptions, type ProjectStatus } from '~/lib/constans.js';
  import FormInput from '~/components/form/FormInput.svelte';
  import Button from '~/components/ui/Button.svelte';
  import FormTextArea from '~/components/form/FormTextArea.svelte';
  import FormSelect from '~/components/form/FormSelect.svelte';

  export let data: DashboardLayoutData;
  const { session } = data;

  let name = '';
  let description = '';
  let status: ProjectStatus = 'not_started';
  let error: string | null = null;
  let loading = false;

  const handleCreate = async () => {
    error = null;
    loading = true;

    const { error: insertError } = await supabase
      .from('projects')
      .insert([{ name, description, status, user_id: session?.user.id }]);

    loading = false;

    if (insertError) {
      error = insertError.message;
    } else {
      goto('/dashboard');
    }
  };
</script>

<form on:submit|preventDefault={handleCreate} class="space-y-4 max-w-md mx-auto mt-10">
  <h1 class="text-2xl font-bold">Create New Project</h1>
  <FormInput bind:value={name} placeholder="Project name" required />
  <FormTextArea bind:value={description} placeholder="Description (optional)" />
  <FormSelect
    bind:value={status}
    options={Object.entries(projectStatusOptions).map(([value, { label }]) => ({ value, label }))}
  />
  <Button type="submit" label={loading ? 'Creating...' : 'Create Project'} disabled={loading} />
  {#if error}
    <p class="text-red-500 mt-2">{error}</p>
  {/if}
</form>
