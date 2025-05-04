<script lang="ts">
  import { projectStatusOptions } from '~/lib/constans.js';
  import type { Project } from '~/lib/server/db/schema.js';
  import ProjectDropdownMenu from '~/components/ProjectDropdownMenu.svelte';

  export let project: Project;
  export let handleDelete: (id: number) => void;
</script>

<li class="p-4 bg-white shadow rounded border">
  <h2 class="text-lg font-semibold">{project.name}</h2>
  {#if project.description}
    <p class="text-sm text-gray-700 mt-1">{project.description}</p>
  {/if}
  {#if project.status}
    <p class="text-xs text-gray-500 mt-2 italic">
      {projectStatusOptions[project.status]}
    </p>
  {/if}
  <ProjectDropdownMenu onDelete={() => handleDelete(project.id)} onEdit={() => undefined} />
</li>
