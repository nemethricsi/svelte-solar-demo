<script lang="ts">
  import { goto } from '$app/navigation';
  import type { DashboardLayoutData } from '~/types/auth.js';
  import { supabase } from '~/lib/supabaseClient.js';

  export let data: DashboardLayoutData;
  const { session } = data;

  let name = '';
  let description = '';
  let error: string | null = null;
  let loading = false;

  const handleCreate = async () => {
    error = null;
    loading = true;

    const {
      count,
      data,
      error: insertError,
      status,
      statusText,
    } = await supabase.from('projects').insert([{ name, description, user_id: session?.user.id }]);

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
  <input
    bind:value={name}
    type="text"
    placeholder="Project name"
    class="w-full p-2 border rounded"
    required
  />
  <textarea
    bind:value={description}
    placeholder="Description (optional)"
    class="w-full p-2 border rounded"
  ></textarea>
  <button
    type="submit"
    class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
    disabled={loading}
  >
    {loading ? 'Creating...' : 'Create Project'}
  </button>
  {#if error}
    <p class="text-red-500 mt-2">{error}</p>
  {/if}
</form>
