<script lang="ts">
  export let onEdit: () => void;
  export let onDelete: () => void;
  export let onComplete: () => void;

  let open = false;

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      open = !open;
      event.preventDefault();
    }
  }
</script>

<div
  class="relative inline-block text-left"
  on:click={() => (open = !open)}
  on:keydown={handleKeydown}
  role="button"
  tabindex="0"
>
  <button class="text-gray-500 hover:text-black"> &#x22ee; </button>

  {#if open}
    <div class="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
      <button on:click={onEdit} class="block w-full px-4 py-2 text-left hover:bg-gray-100"
        >Edit</button
      >
      <button on:click={onComplete} class="block w-full px-4 py-2 text-left hover:bg-gray-100"
        >Mark as completed</button
      >
      <button
        on:click={onDelete}
        class="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-50">Delete</button
      >
    </div>
  {/if}
</div>
