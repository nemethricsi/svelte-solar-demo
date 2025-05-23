import { pgTable, serial, text, timestamp, pgEnum, uuid } from 'drizzle-orm/pg-core';

export const projectStatus = pgEnum('project_status', ['not_started', 'in_progress', 'completed']);

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  status: projectStatus('status').default('not_started').notNull(),
  userId: uuid('user_id').notNull(),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type Project = typeof projects.$inferSelect;
