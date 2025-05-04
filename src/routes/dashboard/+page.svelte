<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { supabase } from '~/lib/supabaseClient.js';

  let userEmail: string | undefined = undefined;

  onMount(async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (!session || error) {
      goto('/');
    } else {
      const loggedInUser = session.user;
      userEmail = loggedInUser.email;
    }
  });

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      goto('/');
    } else {
      console.error('Logout error:', error.message);
    }
  };
</script>

{#if userEmail != null}
  <h1 class="text-xl font-bold mt-10 text-center">Logged in as {userEmail}</h1>
  <button class="btn mt-4" on:click={handleLogout}>Logout</button>
{:else}
  <p class="text-center mt-10">Loading...</p>
{/if}
