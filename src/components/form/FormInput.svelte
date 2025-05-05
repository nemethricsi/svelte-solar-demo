<script lang="ts">
  export let type: 'text' | 'number' | 'email' | 'password' = 'text';
  export let value: string;
  export let label: string;
  export let name: string;
  export let placeholder: string = '';
  export let required: boolean = false;
</script>

<div>
  <label for={name} class="block text-sm font-medium text-gray-500">{label}</label>
  <input bind:value id={name} {type} {placeholder} {required} class="w-full p-2 border rounded" />
</div>
