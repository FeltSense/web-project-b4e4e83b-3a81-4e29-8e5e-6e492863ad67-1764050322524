'use client';

import React, { useState, useEffect } from 'react';
import { Dumbbell, Instagram, Facebook, Twitter, Youtube, MapPin, Phone, Mail, Trophy, Users, Zap, Clock } from 'lucide-react';

export default function Footer() {
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [sweatParticles, setSweatParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  // Track cursor for sweat particles effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const footer = document.getElementById('gym-floor-footer');
      if (footer) {
        const rect = footer.getBoundingClientRect();
        if (e.clientY >= rect.top) {
          setCursorPosition({ x: e.clientX, y: e.clientY - rect.top });
          
          // Generate sweat particles randomly
          if (Math.random() > 0.92) {
            const newParticle = {
              id: Date.now() + Math.random(),
              x: e.clientX,
              y: e.clientY - rect.top
            };
            setSweatParticles(prev => [...prev.slice(-15), newParticle]);
          }
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Workout zones (navigation links)
  const workoutZones = [
    { name: 'Home', href: '#home', icon: Dumbbell, color: 'bg-orange-500' },
    { name: 'Classes', href: '#classes', icon: Users, color: 'bg-teal-600' },
    { name: 'Trainers', href: '#trainers', icon: Trophy, color: 'bg-yellow-400' },
    { name: 'Pricing', href: '#pricing', icon: Zap, color: 'bg-orange-500' },
  ];

  // Equipment stations (social icons)
  const equipmentStations = [
    { name: 'Instagram', icon: Instagram, href: '#', position: 'top-4 left-8' },
    { name: 'Facebook', icon: Facebook, href: '#', position: 'top-4 right-8' },
    { name: 'Twitter', icon: Twitter, href: '#', position: 'bottom-4 left-12' },
    { name: 'Youtube', icon: Youtube, href: '#', position: 'bottom-4 right-12' },
  ];

  return (
    <footer id="gym-floor-footer" className="relative bg-gray-900 text-white overflow-hidden">
      {/* Sweat Particles Effect */}
      {sweatParticles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-teal-400 rounded-full animate-pulse pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            animation: 'sweatDrop 1.5s ease-out forwards',
            opacity: 0.6
          }}
        />
      ))}

      {/* Gym Floor Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 grid-rows-6 h-full w-full">
          {[...Array(72)].map((_, i) => (
            <div key={i} className="border border-teal-600/30" />
          ))}
        </div>
      </div>

      {/* Floor Markings - Athletic Court Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500/40 to-transparent transform -translate-y-1/2" />
        <div className="absolute left-1/4 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-yellow-400/30 to-transparent" />
        <div className="absolute right-1/4 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-yellow-400/30 to-transparent" />
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Main Floor Plan Layout */}
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          
          {/* Left Side - Workout Zones (Navigation) */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Zone Header with Hand-Drawn Element */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <Dumbbell className="w-8 h-8 text-orange-500" />
                  <h3 className="text-3xl font-black tracking-tight">
                    WORKOUT <span className="text-orange-500">ZONES</span>
                  </h3>
                </div>
                <div className="h-1 w-24 bg-yellow-400 rounded-full" />
              </div>

              {/* Interactive Floor Zones */}
              <div className="grid grid-cols-2 gap-4">
                {workoutZones.map((zone, index) => {
                  const Icon = zone.icon;
                  return (
                    <a
                      key={zone.name}
                      href={zone.href}
                      onMouseEnter={() => setActiveZone(zone.name)}
                      onMouseLeave={() => setActiveZone(null)}
                      className="group relative"
                    >
                      <div className={`
                        relative p-6 rounded-lg border-2 border-gray-700
                        transition-all duration-300 overflow-hidden
                        ${activeZone === zone.name ? 'border-orange-500 bg-gray-800 scale-105' : 'hover:border-teal-600'}
                      `}>
                        {/* Zone Floor Texture */}
                        <div className={`
                          absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity
                          ${zone.color}
                        `} style={{
                          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,.1) 10px, rgba(0,0,0,.1) 20px)'
                        }} />
                        
                        {/* Motion Blur Effect on Hover */}
                        <div className={`
                          absolute -inset-2 ${zone.color} opacity-0 group-hover:opacity-20 blur-xl
                          transition-all duration-500 group-hover:animate-pulse
                        `} />
                        
                        <div className="relative z-10">
                          <Icon className={`w-8 h-8 mb-3 transition-transform duration-300 group-hover:scale-110 ${
                            activeZone === zone.name ? 'text-orange-500' : 'text-gray-400 group-hover:text-yellow-400'
                          }`} />
                          <p className="font-bold text-lg tracking-wide group-hover:text-orange-500 transition-colors">
                            {zone.name.toUpperCase()}
                          </p>
                        </div>

                        {/* Zone Number Badge */}
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold text-yellow-400">
                          {index + 1}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Center - Equipment Stations (Social Media) */}
          <div className="lg:col-span-4">
            <div className="relative h-full flex flex-col justify-center">
              {/* Logo & Brand */}
              <div className="text-center mb-8">
                <div className="inline-block relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 via-yellow-400 to-teal-600 opacity-20 blur-2xl animate-pulse" />
                  <h2 className="relative text-5xl font-black tracking-tighter mb-2">
                    FIT<span className="text-orange-500">FORCE</span>
                  </h2>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="font-semibold">GYM</span>
                    <Zap className="w-4 h-4 text-yellow-400" />
                  </div>
                </div>
              </div>

              {/* Equipment Stations - Interactive Social Grid */}
              <div className="relative mx-auto w-64 h-64 my-8">
                {/* Center Circle - Main Floor */}
                <div className="absolute inset-0 border-4 border-dashed border-teal-600/30 rounded-full animate-spin-slow" style={{ animationDuration: '20s' }} />
                <div className="absolute inset-8 border-2 border-orange-500/30 rounded-full" />
                
                {/* Social Icons as Equipment Stations */}
                {equipmentStations.map((station, index) => {
                  const Icon = station.icon;
                  const angle = (index * 90) - 45;
                  const radius = 100;
                  const x = Math.cos(angle * Math.PI / 180) * radius;
                  const y = Math.sin(angle * Math.PI / 180) * radius;
                  
                  return (
                    <a
                      key={station.name}
                      href={station.href}
                      className="group absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                      }}
                    >
                      <div className="relative">
                        {/* Station Platform */}
                        <div className="w-16 h-16 rounded-lg bg-gray-800 border-2 border-gray-700 group-hover:border-orange-500 transition-all duration-300 flex items-center justify-center group-hover:scale-125 group-hover:rotate-12">
                          <Icon className="w-7 h-7 text-gray-400 group-hover:text-orange-500 transition-colors" />
                        </div>
                        
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-orange-500 opacity-0 group-hover:opacity-30 blur-lg rounded-lg transition-opacity" />
                        
                        {/* Station Label */}
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-xs font-bold text-yellow-400">{station.name}</span>
                        </div>
                      </div>
                    </a>
                  );
                })}
                
                {/* Center Logo Icon */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center animate-pulse">
                    <Trophy className="w-6 h-6 text-gray-900" />
                  </div>
                </div>
              </div>

              {/* Motivational Tagline */}
              <div className="text-center">
                <p className="text-gray-400 italic text-sm mb-1">
                  "Transform intimidation into empowerment"
                </p>
                <div className="flex items-center justify-center gap-2 text-xs text-teal-400">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-teal-400" />
                  <Clock className="w-3 h-3" />
                  <span className="font-semibold">YOUR JOURNEY STARTS NOW</span>
                  <Clock className="w-3 h-3" />
                  <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-teal-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Info */}
          <div className="lg:col-span-3">
            <div className="relative">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-8 h-8 text-teal-600" />
                  <h3 className="text-2xl font-black tracking-tight">
                    GET <span className="text-teal-600">STARTED</span>
                  </h3>
                </div>
                <div className="h-1 w-20 bg-orange-500 rounded-full" />
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                {[
                  { icon: MapPin, text: '123 Fitness Ave, Gym City, GC 12345', color: 'text-teal-400' },
                  { icon: Phone, text: '(555) FIT-FORCE', color: 'text-orange-500' },
                  { icon: Mail, text: 'hello@fitforce.gym', color: 'text-yellow-400' },
                ].map((contact, index) => {
                  const Icon = contact.icon;
                  return (
                    <div
                      key={index}
                      className="group relative p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-orange-500 transition-all duration-300 hover:bg-gray-800"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gray-900 border border-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform ${contact.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed pt-2 group-hover:text-white transition-colors">
                          {contact.text}
                        </p>
                      </div>
                      
                      {/* Accent Line */}
                      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-orange-500 to-yellow-400 group-hover:w-full transition-all duration-500" />
                    </div>
                  );
                })}
              </div>

              {/* Achievement Badge */}
              <div className="mt-8 p-4 rounded-lg bg-gradient-to-br from-orange-500/20 to-yellow-400/20 border border-orange-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center animate-bounce">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-orange-500">RATED #1 GYM</p>
                    <p className="text-xs text-gray-400">2024 Fitness Awards</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Legal & Copyright */}
        <div className="relative pt-8 border-t-2 border-gray-800">
          {/* Geometric Accents */}
          <div className="absolute top-0 left-0 w-32 h-0.5 bg-gradient-to-r from-orange-500 to-transparent" />
          <div className="absolute top-0 right-0 w-32 h-0.5 bg-gradient-to-l from-teal-600 to-transparent" />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="hover:text-orange-500 transition-colors relative group"
                >
                  {link}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>
            
            <div className="text-sm text-gray-500 flex items-center gap-2">
              <span>© 2024 FitForce Gym.</span>
              <span className="inline-block w-1 h-1 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-gray-400">All rights reserved.</span>
            </div>
          </div>

          {/* Final Motivational Element */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-600 font-semibold tracking-widest uppercase">
              Every rep counts • Every mile matters • Every journey is celebrated
            </p>
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes sweatDrop {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          100% {
            transform: translateY(30px) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </footer>
  </div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></span></span>);
}