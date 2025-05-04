import { supabase } from '~/lib/supabaseClient.js';

export const fetchProjects = async () => {
  const { data: fetched, error: fetchError } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  return { fetchError, fetched };
};

export const deleteProject = async (id: number, onSuccess: () => Promise<void>) => {
  const confirmDelete = confirm('Are you sure you want to delete this project?');
  if (!confirmDelete) return;

  const { error: deleteError } = await supabase.from('projects').delete().eq('id', id);

  if (deleteError) {
    alert('Failed to delete project: ' + deleteError.message);
  } else {
    onSuccess();
  }
};
