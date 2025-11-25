"use client";

import Image from "next/image";
import { useState } from "react";

export default function Pricing() {
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);
  const [unlockedTiers, setUnlockedTiers] = useState<number[]>([]);

  const handleUnlock = (tier: number) => {
    if (!unlockedTiers.includes(tier)) {
      setUnlockedTiers([...unlockedTiers, tier]);
      setTimeout(() => {
        window.location.href = 'https://buy.stripe.com/test_cNicN778gcvQ2NZ3gV6Ri00';
      }, 1200);
    } else {
      window.location.href = 'https://buy.stripe.com/test_cNicN778gcvQ2NZ3gV6Ri00';
    }
  };

  const tiers = [
    {
      level: "BEGINNER",
      name: "Foundation Builder",
      price: "$29",
      period: "/month",
      description: "Perfect for starting your fitness journey",
      color: "teal",
      xp: "0-500 XP",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
      perks: [
        { icon: "🎯", name: "Unlimited Gym Access", unlocked: true },
        { icon: "💪", name: "Basic Equipment Training", unlocked: true },
        { icon: "📱", name: "FitForce Mobile App", unlocked: true },
        { icon: "🏃", name: "Cardio Zone Access", unlocked: true },
        { icon: "🚿", name: "Locker & Shower Facilities", unlocked: true },
      ],
      badge: "STARTER",
    },
    {
      level: "WARRIOR",
      name: "Performance Athlete",
      price: "$29",
      period: "/month",
      description: "Elevate your training to the next level",
      color: "orange",
      xp: "500-2000 XP",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
      perks: [
        { icon: "⚡", name: "Everything in Foundation", unlocked: true },
        { icon: "🎓", name: "2 PT Sessions/Month", unlocked: true },
        { icon: "🥊", name: "Group Classes Unlimited", unlocked: true },
        { icon: "📊", name: "Body Composition Analysis", unlocked: true },
        { icon: "🎵", name: "Premium Workout Playlists", unlocked: true },
        { icon: "🏋️", name: "Olympic Lifting Platform", unlocked: true },
      ],
      badge: "POPULAR",
      featured: true,
    },
    {
      level: "CHAMPION",
      name: "Elite Transformer",
      price: "$29",
      period: "/month",
      description: "Unlock your ultimate potential",
      color: "yellow",
      xp: "2000+ XP",
      image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80",
      perks: [
        { icon: "👑", name: "Everything in Performance", unlocked: true },
        { icon: "🎯", name: "Unlimited PT Sessions", unlocked: true },
        { icon: "🧘", name: "Recovery & Spa Access", unlocked: true },
        { icon: "🥗", name: "Nutrition Coaching", unlocked: true },
        { icon: "📈", name: "Performance Analytics", unlocked: true },
        { icon: "🏆", name: "VIP Lounge Access", unlocked: true },
        { icon: "👕", name: "Free FitForce Gear", unlocked: true },
      ],
      badge: "ULTIMATE",
    },
  ];

  return (
    <section id="pricing" className="relative bg-gradient-to-br from-gray-900 via-teal-950 to-gray-900 py-24 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-600 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-20 w-32 h-32 border-4 border-orange-500 rotate-45 opacity-30"></div>
        <div className="absolute bottom-20 left-32 w-24 h-24 border-4 border-teal-600 rotate-12 opacity-30"></div>
        <div className="absolute top-1/3 left-10 w-16 h-16 bg-yellow-400 rotate-45 opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-3 bg-orange-500/20 border-2 border-orange-500 px-6 py-2 rounded-full">
              <span className="text-yellow-400 text-2xl animate-bounce">⚡</span>
              <span className="text-orange-500 font-bold text-sm tracking-widest uppercase">Choose Your Power Level</span>
              <span className="text-yellow-400 text-2xl animate-bounce delay-150">⚡</span>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            UNLOCK YOUR
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 animate-pulse">
              TRANSFORMATION
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-teal-300 max-w-3xl mx-auto font-light">
            Every champion starts somewhere. Pick your tier and level up your fitness game.
            <span className="block mt-2 text-yellow-400 font-bold">All tiers just $29/month - Choose your perks!</span>
          </p>

          {/* XP Progress Bar */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="bg-gray-800 rounded-full h-6 overflow-hidden border-2 border-teal-600 relative">
              <div className="absolute inset-0 flex items-center justify-between px-4 text-xs font-bold text-white z-10">
                <span>BEGINNER</span>
                <span>WARRIOR</span>
                <span>CHAMPION</span>
              </div>
              <div className="h-full bg-gradient-to-r from-teal-600 via-orange-500 to-yellow-400 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {tiers.map((tier, index) => {
            const isUnlocked = unlockedTiers.includes(index);
            const isHovered = hoveredTier === index;
            
            return (
              <div
                key={index}
                className={`relative group transition-all duration-500 ${
                  tier.featured ? 'md:scale-110 md:-mt-8' : ''
                } ${isHovered ? 'scale-105' : ''}`}
                onMouseEnter={() => setHoveredTier(index)}
                onMouseLeave={() => setHoveredTier(null)}
              >
                {/* Card Container */}
                <div
                  className={`relative bg-gray-800/90 backdrop-blur-sm rounded-2xl overflow-hidden border-4 transition-all duration-500 ${
                    tier.color === 'teal'
                      ? 'border-teal-600 hover:border-teal-400'
                      : tier.color === 'orange'
                      ? 'border-orange-500 hover:border-orange-400'
                      : 'border-yellow-400 hover:border-yellow-300'
                  } ${tier.featured ? 'shadow-2xl shadow-orange-500/50' : 'shadow-xl'}`}
                >
                  {/* Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <div
                      className={`px-4 py-1 rounded-full text-xs font-black tracking-widest ${
                        tier.color === 'teal'
                          ? 'bg-teal-600 text-white'
                          : tier.color === 'orange'
                          ? 'bg-orange-500 text-white animate-pulse'
                          : 'bg-yellow-400 text-gray-900'
                      }`}
                    >
                      {tier.badge}
                    </div>
                  </div>

                  {/* Image Header with Overlay */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={tier.image}
                      alt={tier.name}
                      fill
                      className={`object-cover transition-transform duration-700 ${
                        isHovered ? 'scale-110 blur-sm' : 'scale-100'
                      }`}
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-b ${
                        tier.color === 'teal'
                          ? 'from-teal-600/80 to-gray-800/95'
                          : tier.color === 'orange'
                          ? 'from-orange-500/80 to-gray-800/95'
                          : 'from-yellow-400/80 to-gray-800/95'
                      }`}
                    ></div>
                    
                    {/* Level Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="bg-gray-900/90 backdrop-blur-sm px-4 py-2 rounded-lg border-2 border-white/30">
                        <div className="text-xs text-gray-400 font-bold">LEVEL</div>
                        <div className="text-lg font-black text-white">{tier.level}</div>
                      </div>
                    </div>

                    {/* XP Badge */}
                    <div className="absolute bottom-4 left-4 z-10">
                      <div className="bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
                        <div className="text-xs font-bold text-yellow-400">{tier.xp}</div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-black text-white mb-2">{tier.name}</h3>
                    <p className="text-gray-400 text-sm mb-6">{tier.description}</p>

                    {/* Price */}
                    <div className="mb-8 text-center py-6 bg-gray-900/50 rounded-xl border-2 border-dashed border-gray-700">
                      <div className="flex items-end justify-center gap-1">
                        <span
                          className={`text-5xl font-black ${
                            tier.color === 'teal'
                              ? 'text-teal-400'
                              : tier.color === 'orange'
                              ? 'text-orange-500'
                              : 'text-yellow-400'
                          }`}
                        >
                          {tier.price}
                        </span>
                        <span className="text-gray-400 text-lg mb-2">{tier.period}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-2 font-bold uppercase tracking-wider">
                        Same Price • Different Perks
                      </div>
                    </div>

                    {/* Perks with Game-style Unlocks */}
                    <div className="space-y-3 mb-8">
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span>Unlocked Perks</span>
                        <div className="flex-1 h-px bg-gray-700"></div>
                      </div>
                      
                      {tier.perks.map((perk, perkIndex) => (
                        <div
                          key={perkIndex}
                          className={`flex items-start gap-3 p-2 rounded-lg transition-all duration-300 ${
                            isHovered
                              ? 'bg-gray-700/50 translate-x-1'
                              : 'bg-transparent'
                          }`}
                          style={{ transitionDelay: `${perkIndex * 50}ms` }}
                        >
                          <span className="text-2xl flex-shrink-0 transform transition-transform duration-300 hover:scale-125">
                            {perk.icon}
                          </span>
                          <span className="text-gray-300 text-sm leading-relaxed">
                            {perk.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => handleUnlock(index)}
                      className={`w-full py-4 rounded-xl font-black text-lg uppercase tracking-wider transition-all duration-300 transform hover:scale-105 active:scale-95 relative overflow-hidden group ${
                        tier.color === 'teal'
                          ? 'bg-teal-600 hover:bg-teal-500 text-white'
                          : tier.color === 'orange'
                          ? 'bg-orange-500 hover:bg-orange-400 text-white shadow-lg shadow-orange-500/50'
                          : 'bg-yellow-400 hover:bg-yellow-300 text-gray-900'
                      }`}
                    >
                      {isUnlocked ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="text-2xl animate-bounce">🎉</span>
                          UNLOCKED!
                          <span className="text-2xl animate-bounce">🎉</span>
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <span>⚡</span>
                          UNLOCK {tier.level}
                          <span>⚡</span>
                        </span>
                      )}
                      
                      {/* Button shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </button>

                    {/* Unlock Animation Overlay */}
                    {isUnlocked && (
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-orange-500/20 to-transparent animate-pulse pointer-events-none rounded-2xl"></div>
                    )}
                  </div>

                  {/* Corner Accents */}
                  <div
                    className={`absolute top-0 right-0 w-20 h-20 ${
                      tier.color === 'teal'
                        ? 'bg-teal-600'
                        : tier.color === 'orange'
                        ? 'bg-orange-500'
                        : 'bg-yellow-400'
                    } opacity-10 -rotate-45 transform translate-x-10 -translate-y-10`}
                  ></div>
                  <div
                    className={`absolute bottom-0 left-0 w-20 h-20 ${
                      tier.color === 'teal'
                        ? 'bg-teal-600'
                        : tier.color === 'orange'
                        ? 'bg-orange-500'
                        : 'bg-yellow-400'
                    } opacity-10 rotate-45 transform -translate-x-10 translate-y-10`}
                  ></div>
                </div>

                {/* Floating Achievement Particles */}
                {isUnlocked && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute animate-ping"
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          animationDelay: `${i * 150}ms`,
                          animationDuration: '1s',
                        }}
                      >
                        <span className="text-2xl">✨</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 p-1 rounded-2xl max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-xl p-8 md:p-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-4xl animate-bounce">🏆</span>
                <h3 className="text-3xl md:text-4xl font-black text-white">
                  ALL TIERS: <span className="text-orange-500">$29/MONTH</span>
                </h3>
                <span className="text-4xl animate-bounce">🏆</span>
              </div>
              
              <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
                Same incredible price, different perks. Choose the tier that matches your fitness goals and start your transformation today!
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-xl">✓</span>
                  <span>No Hidden Fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-xl">✓</span>
                  <span>Cancel Anytime</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-xl">✓</span>
                  <span>7-Day Money Back</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-xl">✓</span>
                  <span>Instant Activation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hand-drawn motivational element */}
          <div className="mt-12">
            <p className="text-2xl md:text-3xl font-bold text-yellow-400 transform -rotate-2 inline-block">
              "Your only limit is you!" 💪
            </p>
          </div>
        </div>
      </div>

      {/* Animated sweat particles (cursor followers would need additional JS) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-teal-400 rounded-full opacity-30 animate-ping"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>
    </section>
  );
}
