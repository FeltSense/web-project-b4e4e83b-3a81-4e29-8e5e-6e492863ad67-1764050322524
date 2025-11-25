'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Hero() {
  const [forceMeter, setForceMeter] = useState(0);
  const [activeTransformation, setActiveTransformation] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sweatParticles, setSweatParticles] = useState<Array<{id: number, x: number, y: number}>>([]);

  // Force meter animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = Math.min((window.scrollY / 500) * 100, 100);
      setForceMeter(scrollPercent);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Initial animation
    setTimeout(() => setForceMeter(85), 500);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Rotating transformations
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTransformation((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Sweat particles following cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Create sweat particles randomly
      if (Math.random() > 0.95) {
        const newParticle = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY
        };
        setSweatParticles(prev => [...prev.slice(-15), newParticle]);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const transformations = [
    { name: 'Sarah M.', result: '-35 lbs in 12 weeks', image: 'photo-1571019613454-1cb2f99b2d8b' },
    { name: 'Mike T.', result: '+20 lbs muscle in 16 weeks', image: 'photo-1583454110551-21f2fa2afe61' },
    { name: 'Jessica K.', result: 'Marathon ready in 8 weeks', image: 'photo-1518611012118-696072aa579a' }
  ];

  const stats = [
    { value: '5K+', label: 'MEMBERS', color: 'from-orange-500 to-yellow-400' },
    { value: '98%', label: 'SUCCESS RATE', color: 'from-yellow-400 to-teal-600' },
    { value: '24/7', label: 'ACCESS', color: 'from-teal-600 to-orange-500' }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900 overflow-hidden">
      {/* Animated sweat particles */}
      {sweatParticles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-teal-600/30 rounded-full animate-ping pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            animationDuration: '1s'
          }}
        />
      ))}

      {/* Geometric background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 border-4 border-orange-500 transform rotate-45 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 border-4 border-teal-600 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 transform -rotate-12 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Split Screen Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT SIDE: Content + Force Meter */}
          <div className="space-y-8 z-10">
            {/* Hand-drawn style motivational badge */}
            <div className="inline-flex items-center space-x-3 bg-gray-800/50 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-dashed border-orange-500/50 animate-pulse">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
              <span className="text-yellow-400 font-bold text-sm tracking-wider">YOUR TRANSFORMATION STARTS NOW</span>
            </div>

            {/* Main headline with athletic typography */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-none">
                <span className="text-white block transform -skew-y-2">UNLEASH</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 block transform skew-y-1 animate-pulse">
                  YOUR
                </span>
                <span className="text-teal-600 block transform -skew-y-1">FORCE</span>
              </h1>
              
              {/* Motion blur effect text */}
              <div className="relative">
                <p className="text-gray-300 text-xl md:text-2xl font-medium leading-relaxed">
                  Transform intimidation into <span className="text-orange-500 font-bold">EMPOWERMENT</span>.
                  Every rep, every milestone, every victory celebrated.
                </p>
                <div className="absolute -right-8 -top-6 text-6xl text-yellow-400/20 font-black transform rotate-12">💪</div>
              </div>
            </div>

            {/* FORCE METER - Animated intensity gauge */}
            <div className="space-y-3 bg-gray-800/80 backdrop-blur-lg p-6 rounded-2xl border border-orange-500/30 shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold text-sm tracking-wider">FORCE METER</span>
                <span className="text-orange-500 font-black text-2xl">{Math.round(forceMeter)}%</span>
              </div>
              
              {/* Weight plate styled progress bar */}
              <div className="relative h-8 bg-gray-900 rounded-full overflow-hidden border-2 border-gray-700">
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 transition-all duration-700 ease-out flex items-center justify-end px-2"
                  style={{ width: `${forceMeter}%` }}
                >
                  {forceMeter > 20 && (
                    <div className="w-6 h-6 bg-gray-900 rounded-full border-2 border-yellow-400 animate-pulse"></div>
                  )}
                </div>
                
                {/* Segmented markers like weight plates */}
                {[25, 50, 75].map(mark => (
                  <div 
                    key={mark}
                    className="absolute top-0 bottom-0 w-0.5 bg-gray-700"
                    style={{ left: `${mark}%` }}
                  />
                ))}
              </div>
              
              <div className="flex justify-between text-xs font-bold text-gray-500">
                <span>WARMUP</span>
                <span>MODERATE</span>
                <span>INTENSE</span>
                <span className="text-orange-500">MAX FORCE</span>
              </div>
            </div>

            {/* CTA Buttons with explosive activation */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className={`relative group overflow-hidden ${forceMeter > 80 ? 'animate-bounce' : ''}`}>
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 animate-pulse"></div>
                <div className="relative px-10 py-5 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-xl font-black text-gray-900 text-lg tracking-wider transform group-hover:scale-105 transition-all duration-300 shadow-2xl">
                  <span className="flex items-center space-x-3">
                    <span>START FREE TRIAL</span>
                    {forceMeter > 80 && <span className="text-2xl animate-ping">🔥</span>}
                  </span>
                </div>
              </button>
              
              <button className="group px-10 py-5 bg-gray-800/50 backdrop-blur-lg border-2 border-teal-600 rounded-xl font-bold text-white text-lg tracking-wider hover:bg-teal-600/20 transition-all duration-300">
                <span className="flex items-center space-x-2">
                  <span>WATCH SUCCESS STORIES</span>
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300">▶</span>
                </span>
              </button>
            </div>

            {/* Animated stats with achievement style */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className="relative group cursor-pointer"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`absolute -inset-1 bg-gradient-to-r ${stat.color} rounded-lg opacity-0 group-hover:opacity-50 blur transition duration-300`}></div>
                  <div className="relative bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg border border-gray-700 group-hover:border-orange-500/50 transition-all duration-300">
                    <div className={`text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-xs font-bold tracking-wider mt-1">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: Transformation Showcase + Live Intensity Visual */}
          <div className="relative lg:h-[700px] space-y-6">
            
            {/* Main transformation image with motion blur effect */}
            <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-teal-600/20 z-10"></div>
              <div className="absolute inset-0 border-4 border-orange-500 rounded-3xl z-20 transform group-hover:scale-105 transition-transform duration-500"></div>
              
              <Image
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80"
                alt="Fitness transformation"
                fill
                className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                priority
              />
              
              {/* Diagonal energy bars */}
              <div className="absolute inset-0 z-30 pointer-events-none">
                <div className="absolute top-10 -left-10 w-full h-2 bg-gradient-to-r from-transparent via-yellow-400 to-transparent transform -rotate-12 animate-pulse"></div>
                <div className="absolute bottom-20 -right-10 w-full h-2 bg-gradient-to-r from-transparent via-orange-500 to-transparent transform rotate-12 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>
              
              {/* Live intensity indicator */}
              <div className="absolute top-6 right-6 z-40 flex items-center space-x-2 bg-gray-900/90 backdrop-blur-lg px-4 py-2 rounded-full border border-orange-500">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-ping"></div>
                <span className="text-white font-bold text-sm">LIVE WORKOUT</span>
              </div>
            </div>

            {/* Rotating transformation cards */}
            <div className="grid grid-cols-3 gap-4">
              {transformations.map((person, index) => (
                <div
                  key={person.name}
                  className={`relative group cursor-pointer transition-all duration-500 transform ${
                    activeTransformation === index 
                      ? 'scale-110 z-20' 
                      : 'scale-95 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className={`absolute -inset-1 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-xl blur ${
                    activeTransformation === index ? 'opacity-75 animate-pulse' : 'opacity-0'
                  } transition-opacity duration-500`}></div>
                  
                  <div className="relative bg-gray-800 rounded-xl overflow-hidden border-2 border-gray-700 group-hover:border-orange-500 transition-all duration-300">
                    <div className="relative h-32">
                      <Image
                        src={`https://images.unsplash.com/${person.image}?w=400&q=80`}
                        alt={person.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className="text-white font-bold text-sm">{person.name}</div>
                      <div className="text-yellow-400 text-xs font-bold">{person.result}</div>
                    </div>
                    
                    {activeTransformation === index && (
                      <div className="absolute top-2 left-2 bg-orange-500 text-gray-900 text-xs font-black px-2 py-1 rounded-full animate-bounce">
                        ⭐ FEATURED
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Achievement celebration badge */}
            <div className="flex items-center justify-center space-x-3 bg-gradient-to-r from-teal-600/20 to-orange-500/20 backdrop-blur-lg p-4 rounded-2xl border border-yellow-400/30">
              <span className="text-4xl animate-bounce">🏆</span>
              <div>
                <div className="text-yellow-400 font-black text-lg">JOIN 5,000+ SUCCESS STORIES</div>
                <div className="text-gray-400 text-sm font-medium">Average 25 lbs transformed in 12 weeks</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom scroll indicator with hand-drawn style */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-3 animate-bounce">
          <span className="text-gray-500 text-xs font-bold tracking-widest">SCROLL TO EXPLORE</span>
          <div className="w-6 h-10 border-2 border-orange-500 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  </div></div>);
}