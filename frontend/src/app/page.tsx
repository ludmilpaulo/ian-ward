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

async function fetchJSON<T>(path: string): Promise<T | null> {
  const base = process.env.NEXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000/api'
  try {
    const res = await fetch(`${base}${path}`, { cache: 'no-store', next: { revalidate: 60 } })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

const defaultProfile: Profile = {
  id: 1,
  full_name: 'Ian Ward',
  title: 'Entrepreneur & Advisor',
  location: 'Cape Town, South Africa',
  bio_short: 'A lifelong entrepreneur with three decades building businesses and supporting founders across South Africa. Known for integrity, deep client relationships, and an ability to spot new opportunities. At Maindo Digital, Ian focuses on driving growth and forging meaningful partnerships.',
  bio_long: 'Outside the boardroom, Ian mentors young entrepreneurs, volunteers in his community, and enjoys Cape Town\'s outdoors.',
  headshot_url: '',
  linkedin_url: 'https://www.linkedin.com/in/ianaward/',
}

const defaultVentures: Venture[] = [
  {
    id: 1,
    name: 'Maindo Digital',
    role: 'Growth & Partnerships',
    description: 'Driving growth initiatives and forging meaningful partnerships across sectors.',
    website: 'https://maindo.digital',
    logo_url: '',
    start_year: null,
    end_year: null,
  },
]

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    author_name: 'Founder, Cape Town',
    author_title: 'Tech Entrepreneur',
    content: 'Ian\'s guidance was pivotal to our go-to-market. He balances strategic clarity with hands-on support.',
    company: 'Stealth Startup',
  },
]

async function getData() {
  const [profileRes, ventures, testimonials] = await Promise.all([
    fetchJSON<Profile>('/profile/primary/'),
    fetchJSON<Venture[]>('/ventures/'),
    fetchJSON<Testimonial[]>('/testimonials/'),
  ])
  return {
    profile: profileRes || defaultProfile,
    ventures: Array.isArray(ventures) ? ventures : defaultVentures,
    testimonials: Array.isArray(testimonials) ? testimonials : defaultTestimonials,
  }
}

export default async function HomePage() {
  const { profile, ventures, testimonials } = await getData()

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-effect border-b border-gray-200/50 backdrop-blur-md">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white grid place-items-center font-bold text-lg shadow-lg transition-transform hover:scale-105">
              IW
            </div>
            <div className="font-semibold text-lg text-gray-900">{profile.full_name}</div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">About</a>
            <a href="#ventures" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Ventures</a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Testimonials</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Contact</a>
            {profile.linkedin_url ? (
              <Link href={profile.linkedin_url} target="_blank" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </Link>
            ) : null}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-20 sm:py-28 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
            Entrepreneur.<br />
            <span className="gradient-text">Mentor.</span><br />
            Partner in Growth.
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
            {profile.bio_short}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a 
              href="#contact" 
              className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Work with Ian
              <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            {profile.linkedin_url ? (
              <Link 
                href={profile.linkedin_url} 
                target="_blank" 
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
              >
                View LinkedIn
              </Link>
            ) : null}
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="relative">
            {profile.headshot_url ? (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-3xl blur-2xl opacity-30"></div>
                <img 
                  src={profile.headshot_url} 
                  alt={profile.full_name} 
                  className="relative h-64 w-64 sm:h-80 sm:w-80 rounded-3xl object-cover shadow-2xl ring-4 ring-white"
                />
              </div>
            ) : (
              <div className="h-64 w-64 sm:h-80 sm:w-80 rounded-3xl bg-gradient-to-br from-blue-100 to-indigo-100 grid place-items-center shadow-2xl ring-4 ring-white">
                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white grid place-items-center font-bold text-4xl shadow-lg">
                  IW
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-20 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">About Ian</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
        </div>
        <p className="text-lg sm:text-xl text-gray-700 leading-relaxed text-center whitespace-pre-line">
          {profile.bio_long || profile.bio_short}
        </p>
      </section>

      {/* Ventures Section */}
      <section id="ventures" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-20 sm:py-24 bg-gray-50">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Ventures</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Building and supporting businesses across South Africa</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {ventures.map(v => (
            <div 
              key={v.id} 
              className="group relative bg-white rounded-2xl border border-gray-200 p-6 lg:p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                {v.logo_url ? (
                  <img src={v.logo_url} alt={v.name} className="h-12 w-12 rounded-xl object-cover shadow-md" />
                ) : (
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 grid place-items-center text-white font-bold text-lg shadow-md">
                    {v.name[0]}
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{v.name}</h3>
                  <p className="text-sm text-gray-600">{v.role}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">{v.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-sm text-gray-500">
                  {v.start_year ? v.start_year : ''}
                  {v.end_year ? ` – ${v.end_year}` : v.start_year ? ' – Present' : ''}
                </div>
                {v.website ? (
                  <Link 
                    href={v.website} 
                    target="_blank" 
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors group"
                  >
                    Visit
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-20 sm:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What People Say</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map(t => (
            <figure 
              key={t.id} 
              className="group relative bg-white rounded-2xl border border-gray-200 p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute top-0 left-0 text-6xl text-blue-100 font-serif leading-none">&ldquo;</div>
              <blockquote className="relative text-gray-800 text-lg leading-relaxed mb-6 pt-4">
                {t.content}
              </blockquote>
              <figcaption className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 grid place-items-center text-white font-semibold">
                  {t.author_name[0]}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{t.author_name}</div>
                  <div className="text-sm text-gray-600">{t.company || t.author_title}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-20 sm:py-24 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-t-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 text-lg">
            Mentorship, partnerships, or new opportunities — let&apos;s talk.
          </p>
        </div>
        <ContactForm />
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 border-t border-gray-200 bg-white">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-gray-600">
            © {new Date().getFullYear()} {profile.full_name}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            {profile.linkedin_url ? (
              <Link 
                href={profile.linkedin_url} 
            target="_blank"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
            ) : null}
          </div>
        </div>
      </footer>
      </main>
  )
}
