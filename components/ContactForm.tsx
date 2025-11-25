'use client';

import { useState, FormEvent } from 'react';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message')
    };

    try {
      const response = await fetch('https://zcxekejiqpibqvczymdr.supabase.co/rest/v1/form_submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjeGVrZWppcXBpYnF2Y3p5bWRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2NTA2OTksImV4cCI6MjA1NzIyNjY5OX0.aIGrEaM0vY2uf_eMEy3xWSUj818qFQk723mbSLjdnGQ',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjeGVrZWppcXBpYnF2Y3p5bWRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2NTA2OTksImV4cCI6MjA1NzIyNjY5OX0.aIGrEaM0vY2uf_eMEy3xWSUj818qFQk723mbSLjdnGQ',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          form_id: 'contact_form',
          form_data: JSON.stringify(data),
          submitted_at: new Date().toISOString()
        })
      });
      
      if (response.ok) {
        setSubmitted(true);
        (e.target as HTMLFormElement).reset();
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="contact" className="py-20 bg-gray-900">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
          <p className="text-gray-300">We will get back to you soon.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="text" name="name" placeholder="Your Name" required className="w-full p-3 bg-gray-800 text-white rounded border border-gray-700" />
          <input type="email" name="email" placeholder="Your Email" required className="w-full p-3 bg-gray-800 text-white rounded border border-gray-700" />
          <input type="tel" name="phone" placeholder="Your Phone" className="w-full p-3 bg-gray-800 text-white rounded border border-gray-700" />
          <textarea name="message" placeholder="Your Message" rows={4} required className="w-full p-3 bg-gray-800 text-white rounded border border-gray-700"></textarea>
          <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 disabled:opacity-50">
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}