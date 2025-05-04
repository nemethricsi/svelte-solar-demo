export const projectStatusOptions = {
  not_started: { label: 'Not started', bg: 'bg-gray-200' },
  in_progress: { label: 'In progress', bg: 'bg-amber-200' },
  completed: { label: 'Completed', bg: 'bg-green-200' },
} as const;

export type ProjectStatus = keyof typeof projectStatusOptions;
