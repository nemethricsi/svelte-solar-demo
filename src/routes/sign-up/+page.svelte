<script lang="ts">
  import { supabase } from '~/lib/supabaseClient.js';
  import { goto } from '$app/navigation';
  import FormInput from '~/components/form/FormInput.svelte';
  import Button from '~/components/ui/Button.svelte';

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
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        goto('/dashboard');
      } else {
        goto('/');
      }
    }
  };
</script>

<form on:submit|preventDefault={handleSignUp} class="space-y-4 max-w-sm mx-auto mt-10">
  <FormInput bind:value={email} type="email" placeholder="Email" required />
  <FormInput bind:value={password} type="password" placeholder="Password" required />
  <Button type="submit" label="Sign up" />

  {#if error}
    <p class="text-red-500 mt-2">Invalid credentials</p>
  {/if}
</form>
