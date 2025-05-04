<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { supabase } from '~/lib/supabaseClient.js';

  let projects: any[] = [];
  let loading = true;
  let error: string | null = null;

  let userEmail: string | undefined = undefined;

  onMount(async () => {
    const { data: fetched, error: fetchError } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    loading = false;

    if (fetchError) {
      error = fetchError.message;
    } else {
      projects = fetched ?? [];
    }
  });

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      goto('/');
    } else {
      console.error('Logout error:', error.message);
    }
  };
</script>

<div class="max-w-3xl mx-auto mt-10 px-4">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-2xl font-bold">Your Projects</h1>
    <div class="flex items-center gap-2">
      <button
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        on:click={() => goto('/dashboard/projects/new')}>New Project</button
      >
      <button
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        on:click={handleLogout}>Logout</button
      >
    </div>
  </div>

  {#if loading}
    <p>Loading projects...</p>
  {:else if error}
    <p class="text-red-500">Error: {error}</p>
  {:else if projects.length === 0}
    <p class="text-gray-500">You don't have any projects yet.</p>
  {:else}
    <ul class="space-y-4">
      {#each projects as project}
        <li class="p-4 bg-white shadow rounded border">
          <h2 class="text-lg font-semibold">{project.name}</h2>
          {#if project.description}
            <p class="text-sm text-gray-700 mt-1">{project.description}</p>
          {/if}
          {#if project.status}
            <p class="text-xs text-gray-500 mt-2 italic">Status: {project.status}</p>
          {/if}
        </li>
      {/each}
    </ul>
  {/if}
</div>
