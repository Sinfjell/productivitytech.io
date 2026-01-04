import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'g3aw9p5p',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

// For server-side writes (e.g., storing leads)
export const writeClient = createClient({
  projectId: 'g3aw9p5p',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // Will be set in environment variables
})



