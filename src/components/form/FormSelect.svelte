<script lang="ts">
  export let value: string;
  export let options: { value: string | number; label: string }[];
</script>

<select bind:value class="w-full p-2 border rounded">
  {#each options as { value, label }}
    <option {value}>{label}</option>
  {/each}
</select>
