import type { LayoutLoad } from './$types.js';

import { supabase } from '~/lib/supabaseClient.js';

export const load: LayoutLoad = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return { session };
};
