<script lang="ts">
  import { Tween } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { checklistTemplate } from '~/lib/constans.js';

  let completedTasks: string[] = [];

  let progress = new Tween(0, {
    duration: 400,
    easing: cubicOut,
  });

  $: {
    if (checklistTemplate && checklistTemplate.length > 0) {
      progress.target = completedTasks.length / checklistTemplate.length;
    }
  }
</script>

<div class="flex flex-col gap-3">
  <h2 class="text-lg font-bold">
    Checklist {(completedTasks.length / checklistTemplate.length) * 100}% done
  </h2>
  <progress value={progress.current} class="w-full block"></progress>
  <div class="flex flex-col gap-2">
    {#each checklistTemplate as task}
      <label>
        <input type="checkbox" name="flavours" value={task.key} bind:group={completedTasks} />
        {task.label}
      </label>
    {/each}
  </div>
</div>
