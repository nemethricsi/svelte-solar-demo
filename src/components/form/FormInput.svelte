<script lang="ts">
  export let type: 'text' | 'number' = 'text';
  export let value: string;
  export let placeholder: string = '';
  export let required: boolean = false;
</script>

<input bind:value {type} {placeholder} {required} class="w-full p-2 border rounded" />
