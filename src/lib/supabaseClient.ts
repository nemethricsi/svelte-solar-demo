import { createClient } from '@supabase/supabase-js';

// export const supabase = createClient(
// 	import.meta.env.PUBLIC_SUPABASE_URL,
// 	import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
// );
export const supabase = createClient(
	'https://trlojuxuggjxwmfezyoe.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRybG9qdXh1Z2dqeHdtZmV6eW9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzNTM3ODEsImV4cCI6MjA2MTkyOTc4MX0.J6cs8pzNwRLjphPqqrJw903_59qufCy3e2wEhd8ldK0',
);
