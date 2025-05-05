<script lang="ts">
  import { projectStatusOptions } from '~/lib/constans.js';
  import type { Project } from '~/lib/server/db/schema.js';
  import ProjectDropdownMenu from '~/components/ProjectDropdownMenu.svelte';
  import { goto } from '$app/navigation';

  export let project: Project;
  export let handleDelete: (id: number) => void;
</script>

<li class="p-4 pr-12 bg-white shadow rounded-md border relative">
  <div class="flex flex-col-reverse sm:flex-row items-start sm:items-center gap-2 mb-6">
    <h2 class="text-lg font-semibold">{project.name}</h2>
    <div
      class="text-xs rounded py-px px-1 text-gray-500 {projectStatusOptions[project.status].style}"
    >
      <span>{projectStatusOptions[project.status].label}</span>
    </div>
  </div>
  <p class="text-sm text-gray-700 line-clamp-3 mt-1">{project.description}</p>
  <ProjectDropdownMenu
    onDelete={() => handleDelete(project.id)}
    onEdit={() => goto(`/dashboard/projects/${project.id}/edit`)}
  />
</li>
