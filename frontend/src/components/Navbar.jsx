import React, { useState, useEffect, useRef } from 'react';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const menuRefs = useRef({});

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' }
  ];

  // Update indicator position based on active menu item
  useEffect(() => {
    const activeElement = menuRefs.current[activeSection];
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement;
      setIndicatorStyle({
        left: offsetLeft,
        width: offsetWidth
      });
    }
  }, [activeSection]);

  // Scroll spy: detect active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = menuItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(menuItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-slate-950/60 shadow-xl shadow-black/50' 
            : 'bg-gradient-to-r from-slate-950/40 via-slate-900/40 to-slate-950/40 shadow-lg shadow-black/30'
        } backdrop-blur-lg border-b border-white/10`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Left Section - Logo */}
            <button
              onClick={() => scrollToSection('home')}
              className="cursor-pointer group focus:outline-none"
            >
              <h1 className="text-2xl font-bold tracking-wider bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-110 group-hover:tracking-widest">
                PG
              </h1>
            </button>

            {/* Center Section - Glassmorphism Menu Container */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
              <div className="relative bg-white/5 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl shadow-black/40 px-3 py-3">
                
                {/* Animated Indicator */}
                <div
                  className="absolute top-3 h-10 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 rounded-full transition-all duration-300 ease-out"
                  style={{
                    left: `${indicatorStyle.left}px`,
                    width: `${indicatorStyle.width}px`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-full blur-lg"></div>
                </div>

                {/* Menu Items */}
                <div className="relative flex items-center space-x-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      ref={(el) => (menuRefs.current[item.id] = el)}
                      onClick={() => scrollToSection(item.id)}
                      className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none ${
                        activeSection === item.id
                          ? 'text-white'
                          : 'text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Section - CTA Button */}
            <button
              onClick={() => scrollToSection('contact')}
              className="relative px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-600/20 to-purple-600/20 backdrop-blur-sm border border-cyan-400/40 text-white font-medium text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/40 hover:border-cyan-400/60 group overflow-hidden focus:outline-none"
            >
              <span className="relative z-10 flex items-center gap-2">
                Contact
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
            </button>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-gray-300 hover:text-white transition-colors focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Demo Content Sections */}
      <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-4xl">
            <div className="mb-6 inline-block px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/20 backdrop-blur-sm">
              <span className="text-cyan-400 text-sm font-medium">Scroll Spy Active ✨</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Welcome Home
            </h2>
            <p className="text-gray-400 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
              Watch the animated indicator move smoothly as you scroll through sections
            </p>
            <div className="mt-12 flex gap-4 justify-center">
              <div className="px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 text-sm">
                Scroll Down ↓
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen flex items-center justify-center px-6 bg-slate-900/50">
          <div className="text-center max-w-4xl">
            <div className="mb-6 inline-block p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/10 backdrop-blur-sm">
              <svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">About</h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Notice how the navbar indicator automatically moves to "About" as you scroll into this section. The scroll spy detects your position in real-time.
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-4xl">
            <div className="mb-6 inline-block p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-white/10 backdrop-blur-sm">
              <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">Skills</h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
              The indicator transitions smoothly with a 300ms ease-out animation
            </p>
            <div className="flex flex-wrap gap-4 justify-center max-w-3xl mx-auto">
              {['React.js', 'Tailwind CSS', 'JavaScript', 'UI/UX Design', 'Glassmorphism', 'Scroll Spy'].map((skill) => (
                <div key={skill} className="px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 hover:border-purple-400/40 hover:bg-purple-500/10 transition-all duration-300">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen flex items-center justify-center px-6 bg-slate-900/50">
          <div className="text-center max-w-4xl">
            <div className="mb-6 inline-block p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-white/10 backdrop-blur-sm">
              <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">Projects</h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Click any menu item to jump to that section with smooth scrolling, and watch the indicator follow your clicks instantly
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-400/40 hover:bg-white/10 transition-all duration-300">
                  <h3 className="text-white font-semibold mb-2">Project {i}</h3>
                  <p className="text-gray-400 text-sm">Glassmorphism design showcase</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-4xl">
            <div className="mb-6 inline-block p-4 rounded-2xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-white/10 backdrop-blur-sm">
              <svg className="w-12 h-12 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">Contact</h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
              Get in touch and let's create something amazing together
            </p>
            <div className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-400/30 text-white text-lg hover:scale-105 transition-transform duration-300">
              hello@example.com
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Navbar;