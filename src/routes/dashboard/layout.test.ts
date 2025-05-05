import type { LayoutLoadEvent } from './$types.js';
import { vi, describe, it, expect } from 'vitest';

const mockGetSession = vi.fn();
vi.mock('~/lib/supabaseClient.js', () => ({
  supabase: { auth: { getSession: mockGetSession } },
}));

describe('load', () => {
  it('returns session from supabase', async () => {
    const { load } = await import('./+layout.js');
    mockGetSession.mockResolvedValueOnce({
      data: { session: { user: { id: '123' } } },
    });

    const result = await load({} as LayoutLoadEvent);
    expect(result).toEqual({ session: { user: { id: '123' } } });
    expect(mockGetSession).toHaveBeenCalled();
  });

  it('returns session as undefined if not present', async () => {
    const { load } = await import('./+layout.js');
    mockGetSession.mockResolvedValueOnce({
      data: { session: undefined },
    });

    const result = await load({} as LayoutLoadEvent);
    expect(result).toEqual({ session: undefined });
  });
});
