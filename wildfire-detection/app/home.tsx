"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";

const HomePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

   // Particle animation for ember/sparks effect
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
  
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
  
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  
      const particles: any[] = [];
      const particleCount = 50;
  
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 1,
          speedY: Math.random() * 1 + 0.5,
          alpha: Math.random() * 0.5 + 0.5,
        });
      }
  
      let animationFrame: number;
  
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  
        particles.forEach((p) => {
          p.y -= p.speedY;
          if (p.y < 0) p.y = canvas.height;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, ${Math.floor(
            100 + Math.random() * 155
          )}, 0, ${p.alpha})`; // ember orange-yellow
          ctx.shadowColor = `rgba(255, ${Math.floor(
            150 + Math.random() * 105
          )}, 0, 0.8)`;
          ctx.shadowBlur = 10;
          ctx.fill();
        });
  
        animationFrame = requestAnimationFrame(animate);
      };
  
      animate();
  
      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      window.addEventListener("resize", handleResize);
  
      return () => {
        cancelAnimationFrame(animationFrame);
        window.removeEventListener("resize", handleResize);
      };
    }, []);
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            WILDFIRE DETECTION
          </div>
          <div className="hidden md:flex space-x-8">
            {["Home", "Fire Map", "AI Classifier"].map((name, idx) => (
              <Link key={idx} href={name === "Home" ? "/" : `/${name.toLowerCase().replace(" ", "_")}`}>
                <span className="relative text-sm font-medium uppercase tracking-wider cursor-pointer transition-all duration-300 hover:text-orange-400 hover:drop-shadow-[0_0_10px_rgba(255,165,0,0.8)]">
                  {name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center">
        {/* Video Background */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/home-banner.mp4" type="video/mp4" />
          </video>
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
          {/* Orange Glow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 via-transparent to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full text-sm font-medium uppercase tracking-wider text-orange-300 backdrop-blur-sm">
              Advanced AI Technology
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-orange-150 to-orange-200 bg-clip-text text-transparent">
              CANADIAN WILDFIRE
            </span>
             <br />
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 bg-clip-text text-transparent">
               DETECTION
            </span>
          </h1>
          
         <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-inter">
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-transparent bg-clip-text font-bold">
              <Typewriter
                words={[
                  "Protecting communities through advanced AI technology.",
                  "Real-time monitoring. Early detection. Swift response.",
                  "Where artificial intelligence meets wildfire prevention.",
                  "Advanced detection systems for Canadian safety."
                ]}
                loop={0} // infinite loop
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/fire_map">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg font-semibold uppercase tracking-wider transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/50 hover:scale-105 cursor-pointer">
                <span className="relative z-10">View Fire Map</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </Link>
            
            <Link href="/ai_classifier">
              <button className="group relative px-8 py-4 bg-transparent border-2 border-orange-500 rounded-lg font-semibold uppercase tracking-wider transition-all duration-300 hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-500/30 cursor-pointer">
                AI Classifier
              </button>
            </Link>
          </div>
        </div>
      </div>

    {/* Project Description Section */}
      <div className="relative bg-black py-20 px-6 z-10">
        <div className="max-w-7xl mx-auto text-center relative z-30">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
            Project Description
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-6xl mx-auto leading-relaxed mb-16">
            Our AI-powered wildfire detection system integrates machine learning and satellite technology to enhance early warning capabilities, fire behavior prediction, and emergency response coordination. By combining real-time environmental data with AI-driven insights, we provide communities and emergency services with actionable intelligence to minimize wildfire damage while maximizing response effectiveness.
          </p>
          
          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group relative overflow-hidden rounded-xl">
              <img 
                src="/api/placeholder/400/300" 
                alt="Satellite Monitoring System" 
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-semibold text-sm mb-1">Satellite Monitoring</h3>
                <p className="text-xs text-gray-300">Real-time fire detection from space</p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-xl">
              <img 
                src="/api/placeholder/400/300" 
                alt="AI Analysis Dashboard" 
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-semibold text-sm mb-1">AI Analysis</h3>
                <p className="text-xs text-gray-300">Machine learning fire prediction</p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-xl">
              <img 
                src="/api/placeholder/400/300" 
                alt="Ground Response Team" 
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-semibold text-sm mb-1">Response Teams</h3>
                <p className="text-xs text-gray-300">Coordinated emergency response</p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-xl">
              <img 
                src="/api/placeholder/400/300" 
                alt="Smart Detection Network" 
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-semibold text-sm mb-1">Detection Network</h3>
                <p className="text-xs text-gray-300">Integrated sensor systems</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      {/* Global Ember particles overlay - positioned absolutely to cover entire page */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-[20]"
      ></canvas>
      <div className="relative bg-gradient-to-b from-black to-gray-900 py-20 mt-12 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 relative z-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Advanced Detection
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Leveraging cutting-edge AI technology to provide real-time wildfire monitoring and early warning systems across Canadian territories.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-20">
            {[
              {
                title: "Live Data Visualization",
                description: "Interactive maps displaying real-time wildfire detections with detailed geographical information and fire progression tracking.",
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                  </svg>
                ),
              },
              {
                title: "AI-Powered Detection",
                description: "Machine learning algorithms analyze satellite imagery and environmental data to detect wildfires with high accuracy and confidence levels.",
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
              },
              {
                title: "Early Warning System",
                description: "Automated alerts and notifications provide early warning capabilities to help protect communities and coordinate emergency response efforts.",
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
              },
            ].map((card, idx) => (
              <div key={idx} className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl border border-orange-500/20 hover:border-orange-500/50 transition-all duration-300 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">{card.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hardware & Upcoming Features Section */}
      <div className="relative bg-gradient-to-b from-gray-900 to-black py-20 px-6 z-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-20">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Autonomous Rover
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Our autonomous rover is deployed using a SparkFun RedBoard with two wheels, a motor driver, and a switch. It can reach remote areas to assist people with limited WiFi access during wildfires.
            </p>
          </div>
          <div className="flex justify-center">
            <img src="/rover.png" alt="Autonomous Rover" className="rounded-xl shadow-lg w-full max-w-md" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center mt-20 relative z-30">
          <div className="flex justify-center md:order-2">
            <img src="/rover-upgrade.png" alt="Rover Upgrades" className="rounded-xl shadow-lg w-full max-w-md" />
          </div>
          <div className="space-y-4 md:order-1">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Upcoming Features
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Enhancing the rover with ultrasonic, temperature, humidity, and smoke sensors. A radio communication feature will allow people without WiFi to receive alerts during wildfires.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;