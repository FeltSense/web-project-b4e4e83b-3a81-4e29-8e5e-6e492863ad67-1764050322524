'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#services', label: 'SERVICES' },
    { href: '#pricing', label: 'PRICING' },
    { href: '#contact', label: 'CONTACT' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-gray-900/95 backdrop-blur-lg shadow-2xl shadow-orange-500/10' 
        : 'bg-transparent'
    }`}>
      {/* Animated top border that pulses like a heart rate monitor */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-yellow-400 to-teal-600 animate-pulse"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with force meter styling */}
          <div className="flex-shrink-0 group cursor-pointer relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-lg opacity-0 group-hover:opacity-20 blur transition duration-300"></div>
            <div className="relative flex items-center space-x-3">
              {/* Geometric force icon */}
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-yellow-400 transform rotate-45 rounded-lg"></div>
                <div className="absolute inset-1 bg-gray-900 transform rotate-45 rounded-lg flex items-center justify-center">
                  <span className="text-orange-500 font-black text-2xl transform -rotate-45">F</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-black text-2xl tracking-tighter leading-none">
                  FIT<span className="text-orange-500">FORCE</span>
                </span>
                <span className="text-teal-600 text-xs font-bold tracking-widest">UNLEASH YOUR POWER</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-6 py-2 text-gray-300 font-bold text-sm tracking-wider group overflow-hidden"
              >
                {/* Animated underline effect */}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-yellow-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                
                {/* Diagonal slash accent */}
                <span className="absolute top-0 right-0 w-1 h-0 bg-orange-500 group-hover:h-full transition-all duration-300 transform skew-x-12"></span>
                
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  {link.label}
                </span>
                
                {/* Number badge like workout reps */}
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-teal-600 text-yellow-400 text-xs font-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {index + 1}
                </span>
              </a>
            ))}
            
            {/* CTA Button with force meter styling */}
            <button className="ml-4 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 rounded-lg blur opacity-60 group-hover:opacity-100 animate-pulse"></div>
              <div className="relative px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-lg font-black text-gray-900 text-sm tracking-wider transform group-hover:scale-105 transition-all duration-300 shadow-lg">
                START FREE TRIAL
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300"></div>
              </div>
            </button>
          </div>

          {/* Mobile menu button with animated bars */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-12 h-12 flex flex-col items-center justify-center space-y-1.5 group"
              aria-label="Toggle menu"
            >
              <span className={`w-7 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-400 transform transition-all duration-300 ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`}></span>
              <span className={`w-7 h-0.5 bg-gradient-to-r from-yellow-400 to-teal-600 transition-all duration-300 ${
                isOpen ? 'opacity-0 scale-0' : ''
              }`}></span>
              <span className={`w-7 h-0.5 bg-gradient-to-r from-teal-600 to-orange-500 transform transition-all duration-300 ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu with slide animation */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ${
        isOpen ? 'max-h-screen' : 'max-h-0'
      }`}>
        <div className="px-4 pt-4 pb-6 space-y-2 bg-gradient-to-b from-gray-900 to-gray-800 border-t border-orange-500/20">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block relative group"
            >
              <div className="flex items-center space-x-4 px-6 py-4 rounded-lg bg-gray-800/50 hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-teal-600/10 transition-all duration-300 border border-transparent hover:border-orange-500/30">
                <span className="text-orange-500 font-black text-xl">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-white font-bold tracking-wider">{link.label}</span>
                <div className="flex-1"></div>
                <span className="text-yellow-400 transform group-hover:translate-x-2 transition-transform duration-300">→</span>
              </div>
            </a>
          ))}
          
          <button className="w-full mt-4 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-lg blur opacity-40 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-lg font-black text-gray-900 tracking-wider">
              START FREE TRIAL
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}