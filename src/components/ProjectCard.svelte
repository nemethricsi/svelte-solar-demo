<script lang="ts">
  import { projectStatusOptions } from '~/lib/constans.js';
  import type { Project } from '~/lib/server/db/schema.js';
  import ProjectDropdownMenu from '~/components/ProjectDropdownMenu.svelte';

  export let project: Project;
  export let handleDelete: (id: number) => void;
</script>

<li class="p-4 bg-white shadow rounded-md border relative">
  <div class="flex items-center gap-2 mb-8">
    <h2 class="text-lg font-semibold">{project.name}</h2>
    <div class="text-xs rounded py-1 px-2 text-gray-500 {projectStatusOptions[project.status].bg}">
      <span>{projectStatusOptions[project.status].label}</span>
    </div>
  </div>
  <p class="text-sm text-gray-700 mt-1">{project.description}</p>
  <ProjectDropdownMenu onDelete={() => handleDelete(project.id)} onEdit={() => undefined} />
</li>
