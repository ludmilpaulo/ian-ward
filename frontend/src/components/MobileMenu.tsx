'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function MobileMenu({ linkedinUrl }: { linkedinUrl?: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white/95 backdrop-blur-md">
          <div className="flex flex-col h-full px-4 py-6">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 via-red-600 to-green-600 text-white grid place-items-center font-bold">
                  IW
                </div>
                <div className="font-semibold text-gray-900">Ian Ward</div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              <a
                href="#about"
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
              >
                About
              </a>
              <a
                href="#ventures"
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-gray-700 hover:text-red-600 transition-colors py-2"
              >
                Ventures
              </a>
              <a
                href="#testimonials"
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-gray-700 hover:text-green-600 transition-colors py-2"
              >
                Testimonials
              </a>
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
              >
                Contact
              </a>
              {linkedinUrl && (
                <Link
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-lg font-semibold text-blue-600 hover:text-blue-700 transition-colors py-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

