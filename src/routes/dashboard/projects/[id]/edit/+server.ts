import { json, error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

import { db } from '~/lib/server/db/index.js';
import { projects } from '~/lib/server/db/schema.js';
import type { RequestHandler } from './$types.js';

export const PATCH: RequestHandler = async ({ params, request }) => {
  const { id } = params;
  const body = await request.json();
  const { name, description, status } = body;

  if (!name || !status) {
    throw error(400, 'Missing required fields');
  }

  try {
    const result = await db
      .update(projects)
      .set({ name, description, status })
      .where(eq(projects.id, Number(id)));

    return json({ success: true, updated: result });
  } catch (err) {
    console.error(err);
    throw error(500, 'Failed to update project');
  }
};
