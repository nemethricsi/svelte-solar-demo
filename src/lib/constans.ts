export const projectStatusOptions = {
  not_started: 'Not started',
  in_progress: 'In progress',
  completed: 'Completed',
} as const;

export type ProjectStatus = keyof typeof projectStatusOptions;
