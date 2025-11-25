'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Dumbbell, Users, Trophy, Zap, Clock, Star, Award, Target, TrendingUp, CheckCircle2, Flame, Medal } from 'lucide-react';

export default function Services() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [flippedTrainer, setFlippedTrainer] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [sweatParticles, setSweatParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Sweat particles that follow cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
          setCursorPos({ x: e.clientX, y: e.clientY - rect.top });
          
          // Generate sweat particles occasionally
          if (Math.random() > 0.85) {
            const newParticle = {
              id: Date.now() + Math.random(),
              x: e.clientX,
              y: e.clientY - rect.top,
              delay: Math.random() * 0.5
            };
            setSweatParticles(prev => [...prev.slice(-8), newParticle]);
          }
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll progress for weight plate bars
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;
        const scrolled = Math.max(0, Math.min(1, (windowHeight - rect.top) / (sectionHeight * 0.8)));
        setScrollProgress(scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const classes = [
    { 
      name: 'HIIT Blast', 
      time: '6:00 AM', 
      trainer: 'Sarah Chen',
      availability: 'available',
      image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=800&q=80',
      spots: 8,
      icon: Flame
    },
    { 
      name: 'Power Lifting', 
      time: '7:30 AM', 
      trainer: 'Marcus Steel',
      availability: 'filling',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
      spots: 3,
      icon: Dumbbell
    },
    { 
      name: 'Yoga Flow', 
      time: '9:00 AM', 
      trainer: 'Luna Park',
      availability: 'available',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
      spots: 12,
      icon: Target
    },
    { 
      name: 'Boxing Circuit', 
      time: '5:00 PM', 
      trainer: 'Jake Rodriguez',
      availability: 'waitlist',
      image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&q=80',
      spots: 0,
      icon: Zap
    },
  ];

  const trainers = [
    {
      name: 'Sarah Chen',
      specialty: 'HIIT & Cardio',
      avatar: 'https://i.pravatar.cc/150?img=5',
      certifications: ['NASM-CPT', 'Nutrition Specialist', '10+ Years'],
      stats: '500+ Lives Changed',
      color: 'orange'
    },
    {
      name: 'Marcus Steel',
      specialty: 'Strength Training',
      avatar: 'https://i.pravatar.cc/150?img=12',
      certifications: ['ACE-CPT', 'Powerlifting Coach', 'Sports Med'],
      stats: '300+ Transformations',
      color: 'teal'
    },
    {
      name: 'Luna Park',
      specialty: 'Yoga & Wellness',
      avatar: 'https://i.pravatar.cc/150?img=9',
      certifications: ['RYT-500', 'Meditation Guide', 'Holistic Health'],
      stats: '1000+ Classes Led',
      color: 'yellow'
    },
  ];

  const membershipTiers = [
    {
      name: 'STARTER',
      price: '$29',
      level: 1,
      features: ['Access to gym floor', 'Locker room access', 'Mobile app tracking', '1 guest pass/month'],
      color: 'from-teal-600 to-teal-700',
      popular: false
    },
    {
      name: 'WARRIOR',
      price: '$59',
      level: 2,
      features: ['All STARTER benefits', 'Unlimited group classes', 'Free fitness assessment', 'Sauna & steam room', '4 guest passes/month'],
      color: 'from-orange-500 to-orange-600',
      popular: true
    },
    {
      name: 'CHAMPION',
      price: '$99',
      level: 3,
      features: ['All WARRIOR benefits', '4 personal training sessions', 'Nutrition consultation', 'Priority class booking', 'Unlimited guest passes'],
      color: 'from-yellow-400 to-yellow-500',
      popular: false
    },
  ];

  const transformations = [
    {
      name: 'Alex Thompson',
      achievement: 'Lost 45 lbs in 6 months',
      before: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80',
      after: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80',
      quote: 'FitForce changed my life. The trainers believed in me when I didn\'t believe in myself.'
    },
    {
      name: 'Maria Garcia',
      achievement: 'Gained 15 lbs muscle',
      before: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80',
      after: 'https://images.unsplash.com/photo-1550345332-09e3ac987658?w=400&q=80',
      quote: 'From cardio-only to lifting heavy. I\'ve never felt stronger!'
    },
  ];

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-500';
      case 'filling': return 'bg-yellow-400 animate-pulse';
      case 'waitlist': return 'bg-red-500 animate-pulse';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section id="services" ref={sectionRef} className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-teal-950 py-24 overflow-hidden">
      {/* Sweat Particles */}
      {sweatParticles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-teal-400 rounded-full opacity-60 pointer-events-none animate-ping"
          style={{
            left: particle.x,
            top: particle.y,
            animationDelay: `${particle.delay}s`,
            animationDuration: '1s'
          }}
        />
      ))}

      {/* Geometric Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-yellow-400/10 rotate-45" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header with Weight Plate Progress Bar */}
        <div className="text-center mb-16 relative">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-6xl font-black text-white tracking-tight">
                UNLEASH YOUR
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-yellow-400 to-teal-400 mt-2">
                  POTENTIAL
                </span>
              </h2>
            </div>
          </div>
          
          {/* Weight Plate Progress Bar */}
          <div className="max-w-2xl mx-auto relative h-8 mt-8">
            <div className="absolute inset-0 bg-gray-800 rounded-full overflow-hidden border-4 border-gray-700">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 via-yellow-400 to-teal-400 transition-all duration-500 ease-out relative"
                style={{ width: `${scrollProgress * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-16 bg-gray-800 border-4 border-orange-500 rounded-lg flex items-center justify-center font-black text-orange-500 shadow-lg shadow-orange-500/50">
                  {Math.round(scrollProgress * 100)}
                </div>
              </div>
            </div>
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-12 h-16 bg-gray-800 border-4 border-gray-700 rounded-lg flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-gray-600" />
            </div>
          </div>
          <p className="text-teal-400 font-bold mt-4 text-sm tracking-widest">SCROLL TO LOAD YOUR PROGRESS</p>
        </div>

        {/* Interactive Class Schedule Cards - Asymmetrical Grid */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <Clock className="w-8 h-8 text-orange-500" />
            <h3 className="text-4xl font-black text-white">TODAY'S CLASSES</h3>
            <div className="flex-1 h-1 bg-gradient-to-r from-orange-500 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {classes.map((classItem, idx) => {
              const Icon = classItem.icon;
              return (
                <div
                  key={idx}
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    transform: hoveredCard === idx ? 'translateY(-20px) rotateX(10deg)' : 'translateY(0) rotateX(0)',
                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                >
                  {/* Card that 'lifts' on hover */}
                  <div className={`relative h-80 rounded-2xl overflow-hidden border-4 ${
                    hoveredCard === idx ? 'border-orange-500 shadow-2xl shadow-orange-500/50' : 'border-gray-700'
                  }`}>
                    <Image
                      src={classItem.image}
                      alt={classItem.name}
                      fill
                      className={`object-cover transition-transform duration-500 ${
                        hoveredCard === idx ? 'scale-110 brightness-75' : 'scale-100 brightness-50'
                      }`}
                    />
                    
                    {/* Front Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div className={`w-12 h-12 rounded-xl ${getAvailabilityColor(classItem.availability)} flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${getAvailabilityColor(classItem.availability)} text-white`}>
                          {classItem.availability === 'available' ? `${classItem.spots} SPOTS` : 
                           classItem.availability === 'filling' ? `${classItem.spots} LEFT!` : 'WAITLIST'}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-3xl font-black text-white mb-2 drop-shadow-lg">{classItem.name}</h4>
                        <p className="text-yellow-400 font-bold text-lg">{classItem.time}</p>
                      </div>
                    </div>

                    {/* Revealed Info on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/95 to-gray-900/90 p-6 flex flex-col justify-center items-center transition-opacity duration-300 ${
                      hoveredCard === idx ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className="text-center">
                        <Users className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                        <h5 className="text-xl font-bold text-white mb-2">Led by</h5>
                        <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-400 mb-4">
                          {classItem.trainer}
                        </p>
                        <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg shadow-orange-500/50">
                          BOOK NOW
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Trainer Profile Bubbles with 3D Flip */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <Star className="w-8 h-8 text-yellow-400" />
            <h3 className="text-4xl font-black text-white">ELITE TRAINERS</h3>
            <div className="flex-1 h-1 bg-gradient-to-r from-yellow-400 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {trainers.map((trainer, idx) => (
              <div
                key={idx}
                className="relative h-96 cursor-pointer perspective-1000"
                onClick={() => setFlippedTrainer(flippedTrainer === idx ? null : idx)}
                style={{
                  transform: `translateY(${Math.sin((cursorPos.x + idx * 200) * 0.01) * 10}px)`,
                  transition: 'transform 0.3s ease-out'
                }}
              >
                <div
                  className={`relative w-full h-full transition-transform duration-700 preserve-3d ${
                    flippedTrainer === idx ? 'rotate-y-180' : ''
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: flippedTrainer === idx ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* Front of Card */}
                  <div className="absolute inset-0 backface-hidden">
                    <div className={`h-full bg-gradient-to-br ${
                      trainer.color === 'orange' ? 'from-orange-500 to-orange-600' :
                      trainer.color === 'teal' ? 'from-teal-600 to-teal-700' :
                      'from-yellow-400 to-yellow-500'
                    } rounded-3xl p-8 flex flex-col items-center justify-center text-center border-4 border-white/20 shadow-2xl relative overflow-hidden group`}>
                      
                      {/* Animated Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-32 h-32 border-4 border-white rounded-full -translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700" />
                        <div className="absolute bottom-0 right-0 w-40 h-40 border-4 border-white rounded-full translate-x-1/2 translate-y-1/2 group-hover:scale-150 transition-transform duration-700" />
                      </div>

                      <div className="relative z-10">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                          <Image
                            src={trainer.avatar}
                            alt={trainer.name}
                            width={128}
                            height={128}
                            className="object-cover"
                          />
                        </div>
                        <h4 className="text-3xl font-black text-white mb-2">{trainer.name}</h4>
                        <p className="text-white/90 font-bold text-lg mb-4">{trainer.specialty}</p>
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                          <Medal className="w-5 h-5 text-white" />
                          <span className="text-white font-bold text-sm">{trainer.stats}</span>
                        </div>
                        <p className="text-white/80 text-sm mt-6 font-bold">CLICK TO FLIP</p>
                      </div>
                    </div>
                  </div>

                  {/* Back of Card - Certifications */}
                  <div className="absolute inset-0 backface-hidden" style={{ transform: 'rotateY(180deg)' }}>
                    <div className="h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border-4 border-orange-500 shadow-2xl flex flex-col justify-center">
                      <Award className="w-16 h-16 text-orange-500 mx-auto mb-6" />
                      <h5 className="text-2xl font-black text-white text-center mb-6">CERTIFICATIONS</h5>
                      <div className="space-y-3">
                        {trainer.certifications.map((cert, certIdx) => (
                          <div key={certIdx} className="flex items-center gap-3 bg-teal-600/20 p-3 rounded-xl border border-teal-600/30">
                            <CheckCircle2 className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                            <span className="text-white font-bold">{cert}</span>
                          </div>
                        ))}
                      </div>
                      <button className="mt-6 w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-all transform hover:scale-105">
                        BOOK SESSION
                      </button>
                      <p className="text-teal-400 text-sm mt-4 text-center font-bold">CLICK TO FLIP BACK</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Membership Tiers with Unlock Animations */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <TrendingUp className="w-8 h-8 text-teal-400" />
            <h3 className="text-4xl font-black text-white">POWER UP YOUR JOURNEY</h3>
            <div className="flex-1 h-1 bg-gradient-to-r from-teal-400 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {membershipTiers.map((tier, idx) => (
              <div
                key={idx}
                className={`relative group cursor-pointer transform hover:scale-105 transition-all duration-500 ${
                  tier.popular ? 'md:-translate-y-8' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <div className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-full font-black text-sm flex items-center gap-2 shadow-lg animate-bounce">
                      <Flame className="w-4 h-4" />
                      MOST POPULAR
                    </div>
                  </div>
                )}

                <div className={`relative h-full bg-gradient-to-br ${tier.color} rounded-3xl p-8 border-4 ${
                  tier.popular ? 'border-white' : 'border-white/20'
                } shadow-2xl overflow-hidden`}>
                  
                  {/* Level Indicator */}
                  <div className="absolute top-4 right-4">
                    <div className="flex gap-1">
                      {[...Array(tier.level)].map((_, i) => (
                        <div key={i} className={`w-2 h-8 bg-white/80 rounded-full ${
                          scrollProgress * 3 > idx ? 'animate-pulse' : ''
                        }`} />
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10">
                    <h4 className="text-2xl font-black text-white mb-2 tracking-wider">{tier.name}</h4>
                    <div className="flex items-end gap-2 mb-8">
                      <span className="text-6xl font-black text-white">{tier.price}</span>
                      <span className="text-white/80 font-bold text-xl mb-2">/month</span>
                    </div>

                    <div className="space-y-3 mb-8">
                      {tier.features.map((feature, featureIdx) => (
                        <div key={featureIdx} className="flex items-start gap-3 group/item">
                          <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0 mt-0.5 group-hover/item:scale-125 transition-transform" />
                          <span className="text-white font-bold text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <button className={`w-full py-4 rounded-full font-black text-lg transition-all transform group-hover:scale-105 shadow-lg ${
                      tier.popular 
                        ? 'bg-white text-orange-500 hover:bg-gray-100' 
                        : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                    }`}>
                      UNLOCK NOW
                    </button>
                  </div>

                  {/* Achievement Badge Animation on Hover */}
                  <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/10 rounded-full group-hover:scale-150 group-hover:-translate-x-10 group-hover:-translate-y-10 transition-all duration-700" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Stories - Transformation Photos */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <Trophy className="w-8 h-8 text-orange-500" />
            <h3 className="text-4xl font-black text-white">REAL RESULTS</h3>
            <div className="flex-1 h-1 bg-gradient-to-r from-orange-500 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {transformations.map((story, idx) => (
              <div key={idx} className="group">
                <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border-4 border-teal-600/30 hover:border-orange-500 transition-all duration-500 shadow-2xl">
                  
                  {/* Before & After Images */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="relative">
                      <div className="absolute -top-3 left-4 z-10 bg-gray-700 text-white px-3 py-1 rounded-full text-xs font-black">
                        BEFORE
                      </div>
                      <div className="relative h-48 rounded-2xl overflow-hidden border-2 border-gray-700 group-hover:border-teal-400 transition-colors">
                        <Image
                          src={story.before}
                          alt={`${story.name} before`}
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute -top-3 left-4 z-10 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-black flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        AFTER
                      </div>
                      <div className="relative h-48 rounded-2xl overflow-hidden border-2 border-orange-500 shadow-lg shadow-orange-500/30">
                        <Image
                          src={story.after}
                          alt={`${story.name} after`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Story Content */}
                  <div className="space-y-3">
                    <h4 className="text-2xl font-black text-white">{story.name}</h4>
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-400 px-4 py-2 rounded-full">
                      <Target className="w-4 h-4 text-white" />
                      <span className="text-white font-black text-sm">{story.achievement}</span>
                    </div>
                    <p className="text-teal-400 italic font-medium leading-relaxed border-l-4 border-orange-500 pl-4">
                      "{story.quote}"
                    </p>
                  </div>

                  {/* Motivational Spark */}
                  <div className="absolute -top-2 -right-2 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg shadow-yellow-400/50 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                    <Zap className="w-8 h-8 text-gray-900" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Hand-drawn Motivational Element */}
          <div className="mt-16 text-center relative">
            <div className="inline-block relative">
              <p className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-yellow-400 to-teal-400 tracking-tight">
                YOUR STORY STARTS TODAY
              </p>
              <div className="absolute -bottom-4 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-orange-500 to-transparent transform -rotate-1" />
              <div className="absolute -bottom-6 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent transform rotate-1" />
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  </div></div></div></div></div></div></div></div></div></div></div></div></div></div>);
}