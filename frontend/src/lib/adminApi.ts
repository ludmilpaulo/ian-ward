export type Profile = {
  id: number
  full_name: string
  title: string
  location: string
  bio_short: string
  bio_long: string
  headshot_url: string
  linkedin_url: string
}

export type Venture = {
  id: number
  name: string
  role: string
  description: string
  website: string
  logo_url: string
  start_year: number | null
  end_year: number | null
  order: number
}

export type Testimonial = {
  id: number
  author_name: string
  author_title: string
  content: string
  company: string
  order: number
}

export type ContactMessage = {
  id: number
  name: string
  email: string
  message: string
  created_at: string
}

function base() {
  return process.env.NEXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000/api'
}

function authHeaders(token: string | null): HeadersInit {
  return token ? { Authorization: `Token ${token}` } : {}
}

export async function apiGet<T>(path: string, token: string | null): Promise<T> {
  const res = await fetch(`${base()}${path}`, { headers: authHeaders(token), cache: 'no-store' })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return res.json()
}

export async function apiSend<T>(path: string, method: string, body: unknown, token: string | null): Promise<T> {
  const headers: HeadersInit = { 'Content-Type': 'application/json', ...authHeaders(token) }
  const res = await fetch(`${base()}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return res.json()
}

