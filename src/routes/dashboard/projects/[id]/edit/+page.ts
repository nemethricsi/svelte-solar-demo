import { supabase } from '~/lib/supabaseClient.js';
import { error } from '@sveltejs/kit';
import type { Project } from '~/lib/server/db/schema.js';

export const load = async ({ params }) => {
  const { id } = params;

  const { data, error: fetchError } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (fetchError || !data) {
    throw error(404, 'Project not found');
  }

  return { project: data as Project };
};
