<script lang="ts">
  export let value: string;
  export let placeholder: string = '';
  export let required: boolean = false;
  export let rows: number = 12;
</script>

<textarea bind:value {placeholder} {rows} {required} class="w-full p-2 border rounded"></textarea>
