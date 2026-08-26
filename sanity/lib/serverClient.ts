import 'server-only'

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, readToken } from '../env'

/**
 * Server-only Sanity client for reading the private dataset.
 * - useCdn: false (fresh for ISR/tag revalidation)
 * - perspective: published (no drafts on public pages)
 * - token: private SANITY_API_READ_TOKEN, never exposed to browser
 * - Enforced via `server-only` import — importing from a client component will throw.
 */
export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'published',
  token: readToken,
  stega: false,
})
