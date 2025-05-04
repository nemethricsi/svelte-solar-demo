<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { supabase } from '~/lib/supabaseClient.js';
  import { deleteProject, fetchProjects } from '~/lib/utils/projects.js';
  import type { Project } from '~/lib/server/db/schema.js';
  import ProjectCard from '~/components/ProjectCard.svelte';

  let projects: Project[] = [];
  let loading = true;
  let error: string | null = null;

  const loadProjects = async () => {
    const { fetchError, fetched } = await fetchProjects();
    loading = false;

    if (fetchError) {
      error = fetchError.message;
    } else {
      projects = fetched ?? [];
    }
  };

  const handleDelete = async (projectId: number) => {
    await deleteProject(projectId, loadProjects);
  };

  onMount(loadProjects);

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
        <ProjectCard {project} {handleDelete} />
      {/each}
    </ul>
  {/if}
</div>
