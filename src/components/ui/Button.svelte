<script lang="ts">
  export let onClick: (() => void) | undefined = undefined;
  export let label: string;
  export let type: 'button' | 'submit' | 'reset' = 'button';
</script>

<button
  {type}
  class="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
  {...$$restProps}
  on:click={onClick}>{label}</button
>
