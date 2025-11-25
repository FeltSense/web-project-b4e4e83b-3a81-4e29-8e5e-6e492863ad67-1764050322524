'use client'

import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import Pricing from '@/components/Pricing'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900">
      {/* Dynamic background elements for energy effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <Services />
        <Testimonials />
        <Pricing />
        <ContactForm />
        <Footer />
      </div>
    </main>
  )
}
