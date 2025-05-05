<script lang="ts">
  import { supabase } from '~/lib/supabaseClient.js';
  import { goto } from '$app/navigation';
  import Button from '~/components/ui/Button.svelte';
  import FormInput from '~/components/form/FormInput.svelte';

  let email = '';
  let password = '';
  let error: string | null = null;

  const handleLogin = async () => {
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      error = loginError.message;
    } else {
      goto('/dashboard');
    }
  };
</script>

<form on:submit|preventDefault={handleLogin} class="space-y-4 max-w-sm mx-auto mt-10">
  <FormInput bind:value={email} type="email" placeholder="Email" required />
  <FormInput bind:value={password} type="password" placeholder="Password" required />
  <Button type="submit" label="Login" />
  <div>
    <a href="/sign-up" class="text-blue-500">Don't have an account? Sign up</a>
  </div>

  {#if error}
    <p class="text-red-500 mt-2">{error}</p>
  {/if}
</form>
