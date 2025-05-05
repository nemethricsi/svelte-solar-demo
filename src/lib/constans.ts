export const projectStatusOptions = {
  not_started: { label: 'Not started', style: 'bg-slate-200 text-slate-800' },
  in_progress: { label: 'In progress', style: 'bg-amber-200 text-amber-800' },
  completed: { label: 'Completed', style: 'bg-green-200 text-green-800' },
} as const;

export type ProjectStatus = keyof typeof projectStatusOptions;

export const checklistTemplate = [
  { key: 'site_visit', label: 'Site visit' },
  { key: 'contract_signed', label: 'Contract signed' },
  { key: 'materials_ordered', label: 'Materials ordered' },
  { key: 'installation_done', label: 'Installation done' },
  { key: 'inspection_complete', label: 'Inspection complete' },
] as const;

export type ChecklistKey = (typeof checklistTemplate)[number]['key'];
