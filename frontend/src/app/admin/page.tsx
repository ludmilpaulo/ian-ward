'use client'

import { useEffect, useMemo, useState } from 'react'
import { apiGet, apiSend, Profile, Venture, Testimonial, ContactMessage } from '@/lib/adminApi'

export default function AdminPage() {
  const [token, setToken] = useState<string>('')
  const [tab, setTab] = useState<'profile' | 'ventures' | 'testimonials' | 'messages'>('profile')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const tokenFromStorage = useMemo(() => {
    if (typeof window === 'undefined') return ''
    return localStorage.getItem('admin_token') || ''
  }, [])

  useEffect(() => {
    if (tokenFromStorage) setToken(tokenFromStorage)
  }, [tokenFromStorage])

  function saveToken() {
    localStorage.setItem('admin_token', token)
  }

  return (
    <main className="px-4 max-w-7xl mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">Admin</h1>
      <div className="mb-6 flex items-center gap-2">
        <input
          value={token}
          onChange={e => setToken(e.target.value)}
          className="border rounded-md px-3 py-2 w-full max-w-xl"
          placeholder="Paste admin API token"
        />
        <button onClick={saveToken} className="rounded-md bg-blue-700 text-white px-4 py-2">Save</button>
      </div>

      <div className="flex items-center gap-3 mb-6">
        {(['profile','ventures','testimonials','messages'] as const).map(k => (
          <button key={k}
            onClick={() => setTab(k)}
            className={`px-3 py-2 rounded-md border ${tab===k? 'bg-blue-50 border-blue-300' : ''}`}
          >{k}</button>
        ))}
      </div>

      {tab === 'profile' && <ProfileEditor token={token} />}
      {tab === 'ventures' && <VentureManager token={token} />}
      {tab === 'testimonials' && <TestimonialManager token={token} />}
      {tab === 'messages' && <MessageList token={token} />}
    </main>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block mb-4">
      <div className="text-sm font-medium mb-1">{label}</div>
      {children}
    </label>
  )
}

function ProfileEditor({ token }: { token: string }) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    apiGet<Profile[]>('/profile/', token)
      .then(rows => { if (mounted) setProfile(rows[0] || null) })
      .catch(e => setError(String(e)))
      .finally(() => setLoading(false))
    return () => { mounted = false }
  }, [token])

  async function save() {
    if (!profile) return
    setSaved(false)
    const method = profile.id ? 'PUT' : 'POST'
    const path = profile.id ? `/profile/${profile.id}/` : '/profile/'
    const updated = await apiSend<Profile>(path, method, profile, token)
    setProfile(updated)
    setSaved(true)
  }

  if (loading) return <div>Loading…</div>
  if (error) return <div className="text-red-600">{error}</div>
  if (!profile) setProfile({
    id: 0, full_name: '', title: '', location: '', bio_short: '', bio_long: '', headshot_url: '', linkedin_url: '',
  })

  return profile ? (
    <div className="max-w-3xl">
      <Field label="Full Name"><input className="w-full border rounded-md px-3 py-2" value={profile.full_name} onChange={e => setProfile({ ...profile, full_name: e.target.value })} /></Field>
      <Field label="Title"><input className="w-full border rounded-md px-3 py-2" value={profile.title} onChange={e => setProfile({ ...profile, title: e.target.value })} /></Field>
      <Field label="Location"><input className="w-full border rounded-md px-3 py-2" value={profile.location} onChange={e => setProfile({ ...profile, location: e.target.value })} /></Field>
      <Field label="Short Bio"><textarea className="w-full border rounded-md px-3 py-2" rows={3} value={profile.bio_short} onChange={e => setProfile({ ...profile, bio_short: e.target.value })} /></Field>
      <Field label="Long Bio"><textarea className="w-full border rounded-md px-3 py-2" rows={6} value={profile.bio_long} onChange={e => setProfile({ ...profile, bio_long: e.target.value })} /></Field>
      <Field label="Headshot URL"><input className="w-full border rounded-md px-3 py-2" value={profile.headshot_url} onChange={e => setProfile({ ...profile, headshot_url: e.target.value })} /></Field>
      <Field label="LinkedIn URL"><input className="w-full border rounded-md px-3 py-2" value={profile.linkedin_url} onChange={e => setProfile({ ...profile, linkedin_url: e.target.value })} /></Field>
      <div className="flex items-center gap-3">
        <button onClick={save} className="rounded-md bg-blue-700 text-white px-4 py-2">Save</button>
        {saved && <span className="text-green-700 text-sm">Saved</span>}
      </div>
    </div>
  ) : null
}

function VentureManager({ token }: { token: string }) {
  const [rows, setRows] = useState<Venture[]>([])
  const [draft, setDraft] = useState<Partial<Venture>>({})
  const [error, setError] = useState<string | null>(null)

  useEffect(() => { apiGet<Venture[]>('/ventures/', token).then(setRows).catch(e => setError(String(e))) }, [token])

  async function create() {
    const created = await apiSend<Venture>('/ventures/', 'POST', draft, token)
    setRows([created, ...rows])
    setDraft({})
  }
  async function save(v: Venture) {
    const updated = await apiSend<Venture>(`/ventures/${v.id}/`, 'PUT', v, token)
    setRows(rows.map(r => r.id === v.id ? updated : r))
  }
  async function remove(id: number) {
    await apiSend<void>(`/ventures/${id}/`, 'DELETE', null, token)
    setRows(rows.filter(r => r.id !== id))
  }

  return (
    <div className="grid gap-6">
      <div className="rounded-lg border p-4">
        <div className="font-semibold mb-3">Create Venture</div>
        <div className="grid sm:grid-cols-2 gap-3">
          <input className="border rounded-md px-3 py-2" placeholder="Name" value={draft.name||''} onChange={e=>setDraft({...draft, name:e.target.value})} />
          <input className="border rounded-md px-3 py-2" placeholder="Role" value={draft.role||''} onChange={e=>setDraft({...draft, role:e.target.value})} />
          <input className="border rounded-md px-3 py-2" placeholder="Website" value={draft.website||''} onChange={e=>setDraft({...draft, website:e.target.value})} />
          <input className="border rounded-md px-3 py-2" placeholder="Logo URL" value={draft.logo_url||''} onChange={e=>setDraft({...draft, logo_url:e.target.value})} />
          <input className="border rounded-md px-3 py-2" placeholder="Start Year" value={draft.start_year||''} onChange={e=>setDraft({...draft, start_year: Number(e.target.value)||null})} />
          <input className="border rounded-md px-3 py-2" placeholder="End Year" value={draft.end_year||''} onChange={e=>setDraft({...draft, end_year: Number(e.target.value)||null})} />
          <input className="border rounded-md px-3 py-2" placeholder="Order" value={draft.order||0} onChange={e=>setDraft({...draft, order: Number(e.target.value)||0})} />
          <textarea className="border rounded-md px-3 py-2 sm:col-span-2" placeholder="Description" value={draft.description||''} onChange={e=>setDraft({...draft, description:e.target.value})} />
        </div>
        <button onClick={create} className="rounded-md bg-blue-700 text-white px-4 py-2 mt-3">Create</button>
      </div>

      <div className="grid gap-4">
        {rows.map((v) => (
          <div key={v.id} className="rounded-lg border p-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <input className="border rounded-md px-3 py-2" value={v.name} onChange={e=>setRows(rs=>rs.map(r=>r.id===v.id?{...r, name:e.target.value}:r))} />
              <input className="border rounded-md px-3 py-2" value={v.role} onChange={e=>setRows(rs=>rs.map(r=>r.id===v.id?{...r, role:e.target.value}:r))} />
              <input className="border rounded-md px-3 py-2" value={v.website} onChange={e=>setRows(rs=>rs.map(r=>r.id===v.id?{...r, website:e.target.value}:r))} />
              <input className="border rounded-md px-3 py-2" value={v.logo_url} onChange={e=>setRows(rs=>rs.map(r=>r.id===v.id?{...r, logo_url:e.target.value}:r))} />
              <input className="border rounded-md px-3 py-2" value={v.start_year||''} onChange={e=>setRows(rs=>rs.map(r=>r.id===v.id?{...r, start_year:Number(e.target.value)||null}:r))} />
              <input className="border rounded-md px-3 py-2" value={v.end_year||''} onChange={e=>setRows(rs=>rs.map(r=>r.id===v.id?{...r, end_year:Number(e.target.value)||null}:r))} />
              <input className="border rounded-md px-3 py-2" value={v.order} onChange={e=>setRows(rs=>rs.map(r=>r.id===v.id?{...r, order:Number(e.target.value)||0}:r))} />
              <textarea className="border rounded-md px-3 py-2 sm:col-span-2" value={v.description} onChange={e=>setRows(rs=>rs.map(r=>r.id===v.id?{...r, description:e.target.value}:r))} />
            </div>
            <div className="flex gap-2 mt-3">
              <button onClick={() => save(v)} className="rounded-md bg-blue-700 text-white px-4 py-2">Save</button>
              <button onClick={() => remove(v.id)} className="rounded-md border px-4 py-2">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TestimonialManager({ token }: { token: string }) {
  const [rows, setRows] = useState<Testimonial[]>([])
  const [draft, setDraft] = useState<Partial<Testimonial>>({})
  const [error, setError] = useState<string | null>(null)

  useEffect(() => { apiGet<Testimonial[]>('/testimonials/', token).then(setRows).catch(e => setError(String(e))) }, [token])

  async function create() {
    const created = await apiSend<Testimonial>('/testimonials/', 'POST', draft, token)
    setRows([created, ...rows])
    setDraft({})
  }
  async function save(v: Testimonial) {
    const updated = await apiSend<Testimonial>(`/testimonials/${v.id}/`, 'PUT', v, token)
    setRows(rows.map(r => r.id === v.id ? updated : r))
  }
  async function remove(id: number) {
    await apiSend<void>(`/testimonials/${id}/`, 'DELETE', null, token)
    setRows(rows.filter(r => r.id !== id))
  }

  return (
    <div className="grid gap-6">
      <div className="rounded-lg border p-4">
        <div className="font-semibold mb-3">Create Testimonial</div>
        <div className="grid sm:grid-cols-2 gap-3">
          <input className="border rounded-md px-3 py-2" placeholder="Author" value={draft.author_name||''} onChange={e=>setDraft({...draft, author_name:e.target.value})} />
          <input className="border rounded-md px-3 py-2" placeholder="Company" value={draft.company||''} onChange={e=>setDraft({...draft, company:e.target.value})} />
          <input className="border rounded-md px-3 py-2" placeholder="Author Title" value={draft.author_title||''} onChange={e=>setDraft({...draft, author_title:e.target.value})} />
          <input className="border rounded-md px-3 py-2" placeholder="Order" value={draft.order||0} onChange={e=>setDraft({...draft, order:Number(e.target.value)||0})} />
          <textarea className="border rounded-md px-3 py-2 sm:col-span-2" placeholder="Content" value={draft.content||''} onChange={e=>setDraft({...draft, content:e.target.value})} />
        </div>
        <button onClick={create} className="rounded-md bg-blue-700 text-white px-4 py-2 mt-3">Create</button>
      </div>

      <div className="grid gap-4">
        {rows.map((v) => (
          <div key={v.id} className="rounded-lg border p-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <input className="border rounded-md px-3 py-2" value={v.author_name} onChange={e=>setRows(rs=>rs.map(r=>r.id===v.id?{...r, author_name:e.target.value}:r))} />
              <input className="border rounded-md px-3 py-2" value={v.company} onChange={e=>setRows(rs=>rs.map(r=>r.id===v.id?{...r, company:e.target.value}:r))} />
              <input className="border rounded-md px-3 py-2" value={v.author_title} onChange={e=>setRows(rs=>rs.map(r=>r.id===v.id?{...r, author_title:e.target.value}:r))} />
              <input className="border rounded-md px-3 py-2" value={v.order} onChange={e=>setRows(rs=>rs.map(r=>r.id===v.id?{...r, order:Number(e.target.value)||0}:r))} />
              <textarea className="border rounded-md px-3 py-2 sm:col-span-2" value={v.content} onChange={e=>setRows(rs=>rs.map(r=>r.id===v.id?{...r, content:e.target.value}:r))} />
            </div>
            <div className="flex gap-2 mt-3">
              <button onClick={() => save(v)} className="rounded-md bg-blue-700 text-white px-4 py-2">Save</button>
              <button onClick={() => remove(v.id)} className="rounded-md border px-4 py-2">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MessageList({ token }: { token: string }) {
  const [rows, setRows] = useState<ContactMessage[]>([])
  const [error, setError] = useState<string | null>(null)
  useEffect(() => { apiGet<ContactMessage[]>('/contact/', token).then(setRows).catch(e => setError(String(e))) }, [token])
  if (error) return <div className="text-red-600">{error}</div>
  return (
    <div className="grid gap-3">
      {rows.map(m => (
        <div key={m.id} className="rounded-lg border p-4">
          <div className="font-medium">{m.name} <span className="text-gray-600">({m.email})</span></div>
          <div className="text-sm text-gray-600 mb-2">{new Date(m.created_at).toLocaleString()}</div>
          <div className="whitespace-pre-line">{m.message}</div>
        </div>
      ))}
    </div>
  )
}

