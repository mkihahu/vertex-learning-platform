export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-08-25'

// Server-only read token for private dataset. Never prefix with NEXT_PUBLIC_.
export const readToken = process.env.SANITY_API_READ_TOKEN

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  // Reject empty or whitespace-only strings
  if (typeof v === 'string' && v.trim() === '') {
    throw new Error(errorMessage)
  }

  return v
}
