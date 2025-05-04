<script lang="ts">
  import EllipsisVertical from '@lucide/svelte/icons/ellipsis-vertical';
  import { onClickOutside } from '~/lib/utils/onClickOutside.js';

  export let onEdit: () => void;
  export let onDelete: () => void;

  let open = false;

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      open = !open;
      event.preventDefault();
    }
  };
</script>

<div
  class="inline-block text-left absolute right-4 top-4"
  on:click={() => (open = !open)}
  on:keydown={handleKeydown}
  role="button"
  tabindex="0"
>
  <button class="text-gray-500 hover:text-black"><EllipsisVertical /></button>

  {#if open}
    <div
      class="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50"
      use:onClickOutside={() => (open = false)}
    >
      <button on:click={onEdit} class="block w-full px-4 py-2 text-left hover:bg-gray-100"
        >Edit</button
      >
      <button
        on:click={onDelete}
        class="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-50">Delete</button
      >
    </div>
  {/if}
</div>
