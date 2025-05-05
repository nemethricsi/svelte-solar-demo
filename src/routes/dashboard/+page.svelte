<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { supabase } from '~/lib/supabaseClient.js';
  import { deleteProject, fetchProjects } from '~/lib/utils/projects.js';
  import type { Project } from '~/lib/server/db/schema.js';
  import ProjectCard from '~/components/ProjectCard.svelte';
  import Button from '~/components/ui/Button.svelte';

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

<div class="max-w-3xl mx-auto mt-10">
  <div class="flex flex-col sm:flex-row sm:justify-between items-center mb-6">
    <h1 class="text-2xl mb-4 flex-grow sm:mb-0 font-bold">Your Projects</h1>
    <div class="flex flex-col w-full sm:w-auto sm:flex-row sm:items-center gap-2">
      <Button onClick={() => goto('/dashboard/projects/new')} label="New Project" />
      <Button onClick={handleLogout} label="Logout" variant="secondary" />
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
