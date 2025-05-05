<script lang="ts">
  export let value: string;
  export let label: string;
  export let options: { value: string | number; label: string }[];
</script>

<div>
  <label for={label} class="block text-sm font-medium text-gray-500">{label}</label>
  <select bind:value class="w-full p-2 border rounded">
    {#each options as { value, label }}
      <option {value}>{label}</option>
    {/each}
  </select>
</div>
