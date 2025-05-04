<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import type { DashboardLayoutData } from '~/types/auth.js';

  export let data: DashboardLayoutData;

  let redirecting = false;

  onMount(() => {
    if (data.session?.user == null) {
      redirecting = true;
      goto('/');
    }
  });
</script>

{#if redirecting}
  <p class="text-center mt-10">Redirecting...</p>
{:else}
  <slot />
{/if}
