import { pgTable, serial, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const projectStatus = pgEnum('project_status', ['not_started', 'in_progress', 'completed']);

export const project = pgTable('projects', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	status: projectStatus('status').default('not_started'),

	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true })
		.defaultNow()
		.$onUpdate(() => new Date()),
});
