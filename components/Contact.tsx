"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

type FitnessGoal = 'strength' | 'cardio' | 'flexibility' | 'weightloss' | null;

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [selectedGoals, setSelectedGoals] = useState<FitnessGoal[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sweatParticles, setSweatParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  // Sweat particles that follow cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Create sweat particle occasionally
      if (Math.random() > 0.92) {
        const newParticle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY
        };
        setSweatParticles(prev => [...prev.slice(-15), newParticle]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    const formData = new FormData(e.currentTarget);
    const formObject: any = {};
    formData.forEach((value, key) => { formObject[key] = value; });
    
    // Add selected fitness goals to form data
    formObject['fitness_goals'] = selectedGoals.join(', ');
    
    try {
      const response = await fetch('https://deep-api-server-2moiw.kinsta.app/api/form_submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form_data: formObject,
          form_id: 'contact_form',
          project_id: 'b4e4e83b-3a81-4e29-8e5e-6e492863ad67',
          founder_id: '',
          submitted_at: new Date().toISOString()
        })
      });
      if (!response.ok) throw new Error('Failed');
      setStatus('success');
    } catch (error) { 
      setStatus('error'); 
    }
  };

  const toggleGoal = (goal: FitnessGoal) => {
    if (!goal) return;
    setSelectedGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const muscleGroups = [
    { 
      id: 'strength', 
      label: 'Build Strength', 
      icon: '💪',
      bodyPart: 'Arms & Chest',
      color: 'from-orange-500 to-red-600'
    },
    { 
      id: 'cardio', 
      label: 'Cardio Endurance', 
      icon: '❤️',
      bodyPart: 'Heart & Lungs',
      color: 'from-teal-600 to-cyan-600'
    },
    { 
      id: 'flexibility', 
      label: 'Flexibility', 
      icon: '🧘',
      bodyPart: 'Full Body',
      color: 'from-yellow-400 to-orange-400'
    },
    { 
      id: 'weightloss', 
      label: 'Weight Loss', 
      icon: '🔥',
      bodyPart: 'Fat Burn',
      color: 'from-orange-600 to-yellow-500'
    }
  ];

  return (
    <section id="contact" className="relative min-h-screen bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 py-20 px-4 overflow-hidden">
      {/* Animated sweat particles */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {sweatParticles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-teal-400/40 rounded-full animate-ping"
            style={{
              left: particle.x,
              top: particle.y,
              animationDuration: '1s'
            }}
          />
        ))}
      </div>

      {/* Dynamic geometric background shapes */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-orange-500 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-600 blur-3xl rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-yellow-400 blur-3xl rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Diagonal motion blur lines */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent transform -rotate-12 translate-y-32"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-600 to-transparent transform -rotate-12 translate-y-64"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent transform -rotate-12 translate-y-96"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        {/* Header with hand-drawn element */}
        <div className="text-center mb-16">
          <div className="inline-block relative">
            <h2 className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tighter">
              START YOUR
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 animate-pulse">
                JOURNEY
              </span>
            </h2>
            {/* Hand-drawn circle accent */}
            <div className="absolute -top-4 -right-8 w-24 h-24 border-4 border-yellow-400 rounded-full opacity-60 transform rotate-12"></div>
            <div className="absolute -bottom-2 -left-6 w-16 h-16 border-4 border-orange-500 rounded-full opacity-60 transform -rotate-12"></div>
          </div>
          <p className="text-teal-300 text-xl md:text-2xl font-light mt-6 max-w-3xl mx-auto">
            No intimidation. Just transformation. Let's assess your goals and ignite your fitness revolution.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* LEFT: Fitness Assessment with Body Visualization */}
          <div className="space-y-8">
            <div className="bg-slate-900/60 backdrop-blur-xl border-2 border-teal-600/30 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                <span className="text-4xl">🎯</span>
                Select Your Fitness Goals
              </h3>
              <p className="text-teal-300 mb-8 text-sm">Click to activate muscle groups you want to target</p>

              {/* Interactive Muscle Group Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {muscleGroups.map(group => {
                  const isSelected = selectedGoals.includes(group.id as FitnessGoal);
                  return (
                    <button
                      key={group.id}
                      type="button"
                      onClick={() => toggleGoal(group.id as FitnessGoal)}
                      className={`relative group p-6 rounded-2xl border-3 transition-all duration-300 transform hover:scale-105 ${
                        isSelected 
                          ? `bg-gradient-to-br ${group.color} border-white shadow-2xl scale-105` 
                          : 'bg-slate-800/50 border-slate-700 hover:border-orange-500'
                      }`}
                    >
                      {/* Pulse effect when selected */}
                      {isSelected && (
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${group.color} opacity-50 animate-ping`}></div>
                      )}
                      
                      <div className="relative z-10">
                        <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform">
                          {group.icon}
                        </div>
                        <h4 className={`font-bold text-lg mb-1 ${isSelected ? 'text-white' : 'text-teal-300'}`}>
                          {group.label}
                        </h4>
                        <p className={`text-sm ${isSelected ? 'text-white/90' : 'text-slate-400'}`}>
                          {group.bodyPart}
                        </p>
                      </div>

                      {/* Checkmark indicator */}
                      {isSelected && (
                        <div className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                          <span className="text-orange-600 font-bold text-xl">✓</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Progress indicator */}
              <div className="bg-slate-800/50 rounded-xl p-4 border border-teal-600/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-teal-300 text-sm font-semibold">Assessment Progress</span>
                  <span className="text-yellow-400 font-bold">{selectedGoals.length}/4 Goals</span>
                </div>
                {/* Weight plate styled progress bar */}
                <div className="relative h-6 bg-slate-900 rounded-full overflow-hidden border-2 border-slate-700">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 transition-all duration-500 flex items-center justify-end pr-2"
                    style={{ width: `${(selectedGoals.length / 4) * 100}%` }}
                  >
                    {selectedGoals.length > 0 && (
                      <div className="w-4 h-4 bg-slate-900 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Motivational Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { num: '500+', label: 'Members', emoji: '👥' },
                { num: '50+', label: 'Classes', emoji: '🏋️' },
                { num: '24/7', label: 'Access', emoji: '⏰' }
              ].map((stat, idx) => (
                <div 
                  key={idx}
                  className="bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-orange-500/30 rounded-2xl p-4 text-center transform hover:scale-105 transition-transform"
                >
                  <div className="text-3xl mb-2">{stat.emoji}</div>
                  <div className="text-2xl font-black text-orange-500">{stat.num}</div>
                  <div className="text-teal-300 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Contact Form */}
          <div className="bg-slate-900/80 backdrop-blur-xl border-2 border-orange-500/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            {/* Geometric accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500 to-yellow-400 opacity-20 blur-3xl"></div>
            
            <h3 className="text-3xl font-bold text-white mb-6 relative z-10">
              Let's Connect 💬
            </h3>

            {status === 'success' ? (
              <div className="text-center py-12 space-y-6 animate-fadeIn">
                <div className="relative inline-block">
                  <div className="text-8xl animate-bounce">🎉</div>
                  <div className="absolute inset-0 animate-ping opacity-75">
                    <div className="text-8xl">🎉</div>
                  </div>
                </div>
                <h4 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-400">
                  AMAZING!
                </h4>
                <p className="text-teal-300 text-lg">
                  Your journey starts now! We'll reach out within 24 hours to schedule your free assessment.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-400 text-slate-900 font-bold rounded-full hover:shadow-2xl hover:scale-105 transition-transform"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                {/* Name Field */}
                <div className="relative group">
                  <label htmlFor="name" className="block text-teal-300 font-semibold mb-2 text-sm uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-6 py-4 bg-slate-800 border-2 border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all group-hover:border-teal-600"
                    placeholder="John Champion"
                  />
                </div>

                {/* Email Field */}
                <div className="relative group">
                  <label htmlFor="email" className="block text-teal-300 font-semibold mb-2 text-sm uppercase tracking-wider">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-6 py-4 bg-slate-800 border-2 border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all group-hover:border-teal-600"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone Field */}
                <div className="relative group">
                  <label htmlFor="phone" className="block text-teal-300 font-semibold mb-2 text-sm uppercase tracking-wider">
                    Phone Number <span className="text-slate-500">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-6 py-4 bg-slate-800 border-2 border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all group-hover:border-teal-600"
                    placeholder="(555) 123-4567"
                  />
                </div>

                {/* Message Field */}
                <div className="relative group">
                  <label htmlFor="message" className="block text-teal-300 font-semibold mb-2 text-sm uppercase tracking-wider">
                    Tell Us About Your Goals *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-6 py-4 bg-slate-800 border-2 border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all resize-none group-hover:border-teal-600"
                    placeholder="I want to build strength and lose weight. I'm a beginner looking for guidance..."
                  />
                </div>

                {/* Selected Goals Display */}
                {selectedGoals.length > 0 && (
                  <div className="bg-slate-800/50 border-2 border-yellow-400/30 rounded-xl p-4">
                    <p className="text-yellow-400 font-semibold text-sm mb-2">✨ Your Selected Goals:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedGoals.map(goal => {
                        const group = muscleGroups.find(g => g.id === goal);
                        return (
                          <span key={goal} className="px-3 py-1 bg-gradient-to-r from-orange-500 to-yellow-400 text-slate-900 rounded-full text-sm font-bold">
                            {group?.icon} {group?.label}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {status === 'error' && (
                  <div className="bg-red-900/30 border-2 border-red-500 rounded-xl p-4 text-red-300">
                    ⚠️ Oops! Something went wrong. Please try again.
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-5 px-8 bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 text-slate-900 font-black text-xl rounded-2xl hover:shadow-2xl hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {status === 'loading' ? (
                      <>
                        <div className="w-6 h-6 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        🚀 IGNITE MY TRANSFORMATION
                      </>
                    )}
                  </span>
                  {/* Animated background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>

                <p className="text-center text-slate-400 text-sm mt-4">
                  🔒 Your information is secure and will never be shared
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom CTA Strip */}
        <div className="mt-16 bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 rounded-3xl p-8 text-center transform hover:scale-105 transition-transform">
          <h4 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
            READY TO CRUSH YOUR LIMITS?
          </h4>
          <p className="text-slate-800 font-semibold text-lg">
            First session is FREE. No pressure. Just pure potential.
          </p>
        </div>
      </div>
    </section>
  </div>);
}