'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sweatDrops, setSweatDrops] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [revealProgress, setRevealProgress] = useState<{ [key: number]: number }>({
    0: 50,
    1: 50,
    2: 50,
  });
  const [isDragging, setIsDragging] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      id: 1,
      name: "Marcus Thompson",
      age: 34,
      achievement: "Lost 45 lbs",
      quote: "I walked in terrified and overweight. FitForce didn't just change my body - it rewired my brain. The coaches celebrated my first pull-up like I won the Olympics. Now I'm the one cheering on newcomers.",
      beforeImage: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80",
      afterImage: "https://images.unsplash.com/photo-1583454155184-870a1f63b6c9?w=800&q=80",
      avatar: "https://i.pravatar.cc/150?img=12",
      timeline: ["30 days: -12 lbs", "60 days: -28 lbs", "90 days: -45 lbs"],
      badges: ["First Pull-Up", "100 Workouts", "Strength Beast"]
    },
    {
      id: 2,
      name: "Sarah Chen",
      age: 28,
      achievement: "Deadlifted 225 lbs",
      quote: "After two knee surgeries, I thought heavy lifting was over. FitForce's trainers built a custom program that made me stronger than ever. I just PR'd at 225 lbs and cried happy tears in the gym.",
      beforeImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
      afterImage: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80",
      avatar: "https://i.pravatar.cc/150?img=47",
      timeline: ["30 days: 135 lbs", "60 days: 185 lbs", "90 days: 225 lbs"],
      badges: ["Comeback Story", "Iron Warrior", "PR Crusher"]
    },
    {
      id: 3,
      name: "David Rodriguez",
      age: 42,
      achievement: "Ran First Marathon",
      quote: "At 42, I couldn't run a mile without stopping. FitForce taught me that age is just a number. Six months later, I crossed a marathon finish line. My kids said I inspired them to be brave.",
      beforeImage: "https://images.unsplash.com/photo-1559078965-e0b8e9c7e0e9?w=800&q=80",
      afterImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
      avatar: "https://i.pravatar.cc/150?img=33",
      timeline: ["30 days: 1 mile", "60 days: 10K race", "90 days: Half Marathon"],
      badges: ["Endurance King", "Marathon Finisher", "Age Defier"]
    }
  ];

  // Sweat drop animation on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
          setMousePosition({ x: e.clientX, y: e.clientY });
          
          // Randomly generate sweat drops
          if (Math.random() > 0.95) {
            const newDrop = {
              id: Date.now(),
              x: e.clientX,
              y: e.clientY
            };
            setSweatDrops(prev => [...prev, newDrop]);
            
            // Remove drop after animation
            setTimeout(() => {
              setSweatDrops(prev => prev.filter(drop => drop.id !== newDrop.id));
            }, 1000);
          }
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Handle slider drag
  const handleSliderInteraction = (index: number, clientX: number, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setRevealProgress(prev => ({ ...prev, [index]: percentage }));
  };

  const handleMouseDown = (index: number) => {
    setIsDragging(index);
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging !== null) {
        const element = document.getElementById(`reveal-${isDragging}`);
        if (element) {
          handleSliderInteraction(isDragging, e.clientX, element);
        }
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(null);
    };

    if (isDragging !== null) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]);

  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      className="relative bg-gradient-to-br from-teal-950 via-teal-900 to-teal-950 py-24 overflow-hidden"
    >
      {/* Animated Background Geometric Shapes */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 border-4 border-orange-500 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-96 h-96 border-4 border-yellow-400 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-orange-500 blur-3xl animate-pulse"></div>
      </div>

      {/* Sweat Drops */}
      {sweatDrops.map(drop => (
        <div
          key={drop.id}
          className="absolute w-2 h-2 bg-teal-400 rounded-full opacity-70 animate-ping pointer-events-none"
          style={{
            left: `${drop.x}px`,
            top: `${drop.y}px`,
            animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) forwards'
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with hand-drawn style */}
        <div className="text-center mb-16">
          <div className="inline-block relative">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
              TRANSFORMATION
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500">
                CHAMPIONS
              </span>
            </h2>
            <div className="absolute -bottom-2 left-0 right-0 h-2 bg-orange-500 transform -skew-x-12"></div>
          </div>
          <p className="text-teal-200 text-xl mt-8 max-w-2xl mx-auto font-medium">
            Real people. Real results. Real transformation stories that prove anything is possible.
          </p>
        </div>

        {/* Main Testimonial Carousel */}
        <div className="relative">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`transition-all duration-700 ${
                index === activeIndex 
                  ? 'opacity-100 scale-100 relative' 
                  : 'opacity-0 scale-95 absolute inset-0 pointer-events-none'
              }`}
            >
              <div className="bg-teal-800/50 backdrop-blur-sm rounded-3xl overflow-hidden border-4 border-orange-500 shadow-2xl">
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  {/* Before/After Image Reveal */}
                  <div className="relative">
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                      {/* Before Image */}
                      <div 
                        id={`reveal-${index}`}
                        className="relative w-full h-full cursor-ew-resize select-none"
                        onMouseDown={(e) => {
                          handleMouseDown(index);
                          handleSliderInteraction(index, e.clientX, e.currentTarget);
                        }}
                        onMouseMove={(e) => {
                          if (isDragging === index) {
                            handleSliderInteraction(index, e.clientX, e.currentTarget);
                          }
                        }}
                        onTouchStart={(e) => {
                          handleMouseDown(index);
                          const touch = e.touches[0];
                          handleSliderInteraction(index, touch.clientX, e.currentTarget);
                        }}
                        onTouchMove={(e) => {
                          if (isDragging === index) {
                            const touch = e.touches[0];
                            handleSliderInteraction(index, touch.clientX, e.currentTarget);
                          }
                        }}
                        onTouchEnd={handleMouseUp}
                      >
                        {/* After Image (Base Layer) */}
                        <Image
                          src={testimonial.afterImage}
                          alt={`${testimonial.name} after transformation`}
                          fill
                          className="object-cover"
                        />
                        
                        {/* Before Image (Overlay) */}
                        <div 
                          className="absolute inset-0 overflow-hidden"
                          style={{ width: `${revealProgress[index]}%` }}
                        >
                          <Image
                            src={testimonial.beforeImage}
                            alt={`${testimonial.name} before transformation`}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Slider Handle */}
                        <div 
                          className="absolute top-0 bottom-0 w-1 bg-yellow-400 shadow-lg cursor-ew-resize"
                          style={{ left: `${revealProgress[index]}%` }}
                        >
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-yellow-400 rounded-full border-4 border-white shadow-xl flex items-center justify-center">
                            <div className="flex gap-1">
                              <div className="w-1 h-4 bg-teal-900 rounded"></div>
                              <div className="w-1 h-4 bg-teal-900 rounded"></div>
                            </div>
                          </div>
                        </div>

                        {/* Before/After Labels */}
                        <div className="absolute top-4 left-4 bg-teal-900/90 text-yellow-400 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                          Before
                        </div>
                        <div className="absolute top-4 right-4 bg-orange-500/90 text-white px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                          After
                        </div>
                      </div>

                      {/* Floating PR Badges */}
                      <div className="absolute -top-4 -right-4 flex flex-col gap-2">
                        {testimonial.badges.slice(0, 2).map((badge, idx) => (
                          <div 
                            key={idx}
                            className="bg-yellow-400 text-teal-900 px-3 py-2 rounded-lg font-bold text-xs shadow-lg transform rotate-3 hover:rotate-0 transition-transform animate-bounce"
                            style={{ animationDelay: `${idx * 0.2}s`, animationDuration: '2s' }}
                          >
                            🏆 {badge}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Timeline Slider */}
                    <div className="mt-6 bg-teal-900/50 rounded-xl p-4 border-2 border-teal-700">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-teal-300 text-sm font-bold uppercase">Progress Timeline</span>
                        <span className="text-orange-500 text-xs font-bold">Drag to explore →</span>
                      </div>
                      <div className="space-y-2">
                        {testimonial.timeline.map((milestone, idx) => (
                          <div 
                            key={idx}
                            className="flex items-center gap-3 group hover:scale-105 transition-transform"
                          >
                            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0 group-hover:bg-yellow-400 transition-colors">
                              {(idx + 1) * 30}
                            </div>
                            <div className="flex-1 h-3 bg-teal-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full animate-pulse"
                                style={{ 
                                  width: `${((idx + 1) / 3) * 100}%`,
                                  animationDuration: '2s',
                                  animationDelay: `${idx * 0.3}s`
                                }}
                              ></div>
                            </div>
                            <span className="text-white text-sm font-bold whitespace-nowrap">{milestone}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Testimonial Content */}
                  <div className="flex flex-col justify-center space-y-6">
                    {/* Profile Header */}
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full border-4 border-orange-500 overflow-hidden shadow-xl">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            width={80}
                            height={80}
                            className="object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-xl animate-bounce">
                          💪
                        </div>
                      </div>
                      <div>
                        <h3 className="text-3xl font-black text-white">{testimonial.name}</h3>
                        <p className="text-teal-300 font-medium">Age {testimonial.age}</p>
                      </div>
                    </div>

                    {/* Achievement Badge */}
                    <div className="inline-block">
                      <div className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-6 py-3 rounded-xl transform -skew-x-6 shadow-lg">
                        <span className="block transform skew-x-6 font-black text-2xl uppercase tracking-wide">
                          {testimonial.achievement}
                        </span>
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="relative">
                      <div className="text-6xl text-orange-500/30 font-serif absolute -top-4 -left-2">"</div>
                      <p className="text-white text-lg leading-relaxed pl-8 pr-4 italic font-medium">
                        {testimonial.quote}
                      </p>
                      <div className="text-6xl text-orange-500/30 font-serif absolute -bottom-8 right-0">"</div>
                    </div>

                    {/* All Badges */}
                    <div className="flex flex-wrap gap-2 pt-4">
                      {testimonial.badges.map((badge, idx) => (
                        <div 
                          key={idx}
                          className="bg-teal-700/50 border-2 border-yellow-400 text-yellow-400 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide hover:bg-yellow-400 hover:text-teal-900 transition-all cursor-pointer transform hover:scale-110"
                        >
                          {badge}
                        </div>
                      ))}
                    </div>

                    {/* Motion Blur Effect Bar */}
                    <div className="relative h-2 bg-teal-700 rounded-full overflow-hidden mt-4">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-pulse blur-sm"></div>
                      <div 
                        className="h-full bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full animate-pulse"
                        style={{ 
                          width: '100%',
                          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Dots */}
          <div className="flex justify-center gap-4 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === activeIndex
                    ? 'w-16 h-4 bg-gradient-to-r from-orange-500 to-yellow-400'
                    : 'w-4 h-4 bg-teal-600 hover:bg-teal-500'
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-16 h-16 bg-orange-500 hover:bg-yellow-400 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 group"
            aria-label="Previous testimonial"
          >
            <svg className="w-8 h-8 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-16 h-16 bg-orange-500 hover:bg-yellow-400 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 group"
            aria-label="Next testimonial"
          >
            <svg className="w-8 h-8 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="inline-block bg-gradient-to-r from-teal-800 to-teal-900 p-8 rounded-2xl border-4 border-yellow-400 shadow-2xl transform hover:scale-105 transition-transform">
            <h3 className="text-3xl font-black text-white mb-4">
              YOUR STORY STARTS HERE
            </h3>
            <p className="text-teal-200 mb-6 text-lg">
              Join hundreds of members who transformed their lives at FitForce
            </p>
            <button className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-10 py-4 rounded-full font-black text-lg uppercase tracking-wider shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all">
              Start Your Transformation
              <span className="ml-2 inline-block animate-bounce">💥</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div></button>);
}