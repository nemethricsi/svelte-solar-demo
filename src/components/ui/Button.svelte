<script lang="ts">
  export let onClick: (() => void) | undefined = undefined;
  export let label: string;
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let variant: 'primary' | 'secondary' = 'primary';
</script>

<button
  {type}
  class="px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed {variant === 'primary'
    ? 'bg-slate-600 text-white hover:bg-slate-700'
    : ''} {variant === 'secondary' ? 'bg-slate-200 text-slate-600 hover:bg-slate-300' : ''}"
  {...$$restProps}
  on:click={onClick}>{label}</button
>
