<script lang="ts">
  export let value: string;
  export let placeholder: string = '';
  export let required: boolean = false;
  export let rows: number = 12;
  export let name: string;
  export let label: string;
</script>

<div>
  <label for={name} class="block text-sm font-medium text-gray-500">{label}</label>
  <textarea bind:value id={name} {placeholder} {rows} {required} class="w-full p-2 border rounded"
  ></textarea>
</div>
