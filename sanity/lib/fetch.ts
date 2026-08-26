import 'server-only'

import { serverClient } from './serverClient'

/**
 * Server-only fetch helper. Wraps serverClient.fetch with ISR defaults.
 * Use in Server Components / Route Handlers only.
 */
export async function sanityFetch<QueryResult>(
  query: string,
  params: Record<string, unknown> = {},
  options: { revalidate?: number | false; tags?: string[] } = {},
): Promise<QueryResult> {
  const { revalidate = 60, tags } = options
  return serverClient.fetch<QueryResult>(query, params, {
    next: {
      revalidate: revalidate as number | false,
      ...(tags ? { tags } : {}),
    },
  })
}
