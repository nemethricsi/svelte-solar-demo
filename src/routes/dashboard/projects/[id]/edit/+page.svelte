<script lang="ts">
  import { goto } from '$app/navigation';
  import type { PageData } from './$types.js';

  import { projectStatusOptions } from '~/lib/constans.js';
  import FormInput from '~/components/form/FormInput.svelte';

  export let data: PageData;

  let loading = false;
  let error: string | null = null;

  const handleSubmit = async () => {
    loading = true;
    error = null;

    const res = await fetch(`/dashboard/projects/${data.project.id}/edit`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.project.name,
        description: data.project.description,
        status: data.project.status,
      }),
    });

    loading = false;

    if (!res.ok) {
      error = await res.text();
    } else {
      goto('/dashboard');
    }
  };
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-4 max-w-md mx-auto mt-10">
  <h1 class="text-2xl font-bold">Edit "{data.project.name}"</h1>
  <FormInput bind:value={data.project.name} placeholder="Project name" required />
  <textarea
    bind:value={data.project.description}
    placeholder="Description (optional)"
    class="w-full p-2 border rounded"
    rows={12}
  ></textarea>
  <select bind:value={data.project.status} class="w-full p-2 border rounded">
    {#each Object.entries(projectStatusOptions) as [value, { label }]}
      <option {value}>{label}</option>
    {/each}
  </select>
  <button
    type="submit"
    class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
    disabled={loading}
  >
    {loading ? 'Saving...' : 'Update Project'}
  </button>
  {#if error}
    <p class="text-red-500 mt-2">{error}</p>
  {/if}
</form>
