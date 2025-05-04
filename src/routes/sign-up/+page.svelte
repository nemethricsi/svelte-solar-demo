<script lang="ts">
  import { supabase } from '~/lib/supabaseClient.js';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let error: string | null = null;

  const handleSignUp = async () => {
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      error = signUpError.message;
    } else {
      // Auth flow: ha Supabase "email confirmation"-t kér, akkor itt nem lesz session
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        goto('/dashboard');
      } else {
        // vagy mutathatsz egy visszaigazoló üzenetet
        goto('/');
      }
    }
  };
</script>

<form on:submit|preventDefault={handleSignUp} class="space-y-4 max-w-sm mx-auto mt-10">
  <input bind:value={email} type="email" placeholder="Email" class="input" required />
  <input bind:value={password} type="password" placeholder="Password" class="input" required />
  <button type="submit" class="btn">Sign up</button>

  {#if error}
    <p class="text-red-500 mt-2">{error}</p>
  {/if}
</form>
