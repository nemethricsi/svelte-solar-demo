export const projectStatusOptions = {
  not_started: { label: 'Not started', style: 'bg-slate-200 text-slate-800' },
  in_progress: { label: 'In progress', style: 'bg-amber-200 text-amber-800' },
  completed: { label: 'Completed', style: 'bg-green-200 text-green-800' },
} as const;

export type ProjectStatus = keyof typeof projectStatusOptions;
