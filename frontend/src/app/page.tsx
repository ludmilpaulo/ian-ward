import Link from 'next/link'
import { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Ian Ward — Portfolio',
}

type Profile = {
  id: number
  full_name: string
  title: string
  location: string
  bio_short: string
  bio_long: string
  headshot_url: string
  linkedin_url: string
}

type Venture = {
  id: number
  name: string
  role: string
  description: string
  website: string
  logo_url: string
  start_year: number | null
  end_year: number | null
}

type Testimonial = {
  id: number
  author_name: string
  author_title: string
  content: string
  company: string
}

async function fetchJSON<T>(path: string): Promise<T> {
  const base = process.env.NEXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000/api'
  const res = await fetch(`${base}${path}`, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Failed to fetch ${path}`)
  return res.json()
}

async function getData() {
  const [profile, ventures, testimonials] = await Promise.all([
    fetchJSON<Profile>('/profile/primary/'),
    fetchJSON<Venture[]>('/ventures/'),
    fetchJSON<Testimonial[]>('/testimonials/'),
  ])
  return { profile, ventures, testimonials }
}

export default async function HomePage() {
  const { profile, ventures, testimonials } = await getData()

  return (
    <main>
      <nav className="px-4 max-w-7xl mx-auto py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-600 text-white grid place-items-center font-bold">IW</div>
          <div className="font-semibold">{profile.full_name}</div>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-700">
          <a href="#about">About</a>
          <a href="#ventures">Ventures</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#contact">Contact</a>
          {profile.linkedin_url ? (
            <Link href={profile.linkedin_url} target="_blank" className="inline-flex items-center text-blue-700 font-medium">
              LinkedIn
            </Link>
          ) : null}
        </div>
      </nav>

      <header className="px-4 max-w-7xl mx-auto py-16 sm:py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        <div>
          <h1 className="h1 mb-4">Entrepreneur. Mentor. Partner in Growth.</h1>
          <p className="p-muted mb-6">{profile.bio_short}</p>
          <div className="flex gap-3">
            <a href="#contact" className="rounded-md bg-blue-700 text-white px-5 py-3">Work with Ian</a>
            {profile.linkedin_url ? (
              <Link href={profile.linkedin_url} target="_blank" className="rounded-md border px-5 py-3">LinkedIn</Link>
            ) : null}
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          {profile.headshot_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.headshot_url} alt={profile.full_name} className="h-56 w-56 rounded-2xl object-cover shadow-lg" />
          ) : (
            <div className="h-56 w-56 rounded-2xl bg-gray-100 grid place-items-center">Headshot</div>
          )}
        </div>
      </header>

      <section id="about" className="px-4 max-w-7xl mx-auto py-16 sm:py-20">
        <h2 className="h2 mb-3">About Ian</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{profile.bio_long || profile.bio_short}</p>
      </section>

      <section id="ventures" className="px-4 max-w-7xl mx-auto py-16 sm:py-20">
        <h2 className="h2 mb-8">Ventures</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ventures.map(v => (
            <div key={v.id} className="rounded-xl border p-5 hover:shadow-sm transition">
              <div className="flex items-center gap-3 mb-3">
                {v.logo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={v.logo_url} alt={v.name} className="h-10 w-10 rounded-md object-cover" />
                ) : (
                  <div className="h-10 w-10 rounded-md bg-gray-100 grid place-items-center">{v.name[0]}</div>
                )}
                <div>
                  <div className="font-semibold">{v.name}</div>
                  <div className="text-sm text-gray-600">{v.role}</div>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">{v.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div>
                  {v.start_year ? v.start_year : ''}
                  {v.end_year ? ` – ${v.end_year}` : ''}
                </div>
                {v.website ? (
                  <Link href={v.website} target="_blank" className="text-blue-700 font-medium">Visit</Link>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="testimonials" className="px-4 max-w-7xl mx-auto py-16 sm:py-20">
        <h2 className="h2 mb-8">Testimonials</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map(t => (
            <figure key={t.id} className="rounded-xl border p-6 bg-white">
              <blockquote className="text-gray-800 leading-relaxed">“{t.content}”</blockquote>
              <figcaption className="mt-4 text-sm text-gray-600">— {t.author_name}{t.company ? `, ${t.company}` : ''}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="contact" className="px-4 max-w-7xl mx-auto py-16 sm:py-20">
        <h2 className="h2 mb-3">Get in touch</h2>
        <p className="p-muted mb-6">Mentorship, partnerships, or new opportunities — let’s talk.</p>
        <ContactForm />
      </section>

      <footer className="px-4 max-w-7xl mx-auto pb-16">
        <div className="border-t pt-6 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} {profile.full_name}. All rights reserved.</div>
          <div className="flex items-center gap-4">
            {profile.linkedin_url ? (
              <Link href={profile.linkedin_url} target="_blank">LinkedIn</Link>
            ) : null}
          </div>
        </div>
      </footer>
      </main>
  )
}
