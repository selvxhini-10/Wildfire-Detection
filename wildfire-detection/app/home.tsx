"use client";

import React from "react";
import Link from "next/link";
import { Typewriter } from 'react-simple-typewriter';


const HomePage = () => {
  
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Top Navigation Bar - Fixed and Transparent */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            WILDFIRE DETECTION
          </div>
          <div className="hidden md:flex space-x-8">
            <Link href="/">
              <span className="relative text-sm font-medium uppercase tracking-wider hover:text-orange-400 transition-all duration-300 cursor-pointer group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>
            <Link href="/fire_map">
              <span className="relative text-sm font-medium uppercase tracking-wider hover:text-orange-400 transition-all duration-300 cursor-pointer group">
                Fire Map
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>
            <Link href="/ai_classifier">
              <span className="relative text-sm font-medium uppercase tracking-wider hover:text-orange-400 transition-all duration-300 cursor-pointer group">
                AI Classifier
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-white hover:text-orange-400 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Video Background */}
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
            <span className="bg-gradient-to-r from-white via-orange-100 to-orange-200 bg-clip-text text-transparent">
              CANADIAN
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 bg-clip-text text-transparent">
              WILDFIRE
            </span>
            <br />
            <span className="bg-gradient-to-r from-white via-orange-100 to-orange-200 bg-clip-text text-transparent">
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

      {/* Features Section */}
      <div className="relative bg-gradient-to-b from-black to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Advanced Detection
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Leveraging cutting-edge AI technology to provide real-time wildfire monitoring and early warning systems across Canadian territories.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl border border-orange-500/20 hover:border-orange-500/50 transition-all duration-300 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Live Data Visualization</h3>
                <p className="text-gray-300 leading-relaxed">
                  Interactive maps displaying real-time wildfire detections with detailed geographical information and fire progression tracking.
                </p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl border border-orange-500/20 hover:border-orange-500/50 transition-all duration-300 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">AI-Powered Detection</h3>
                <p className="text-gray-300 leading-relaxed">
                  Machine learning algorithms analyze satellite imagery and environmental data to detect wildfires with high accuracy and confidence levels.
                </p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl border border-orange-500/20 hover:border-orange-500/50 transition-all duration-300 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Early Warning System</h3>
                <p className="text-gray-300 leading-relaxed">
                  Automated alerts and notifications provide early warning capabilities to help protect communities and coordinate emergency response efforts.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-orange-500/10 border border-orange-500/30 rounded-full backdrop-blur-sm">
              <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-orange-300 font-medium" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}>
                Explore the interactive 
                <Link href="/fire_map">
                  <span className="text-orange-400 hover:text-orange-300 underline cursor-pointer ml-1">
                    Fire Map
                  </span>
                </Link>
                 for real-time wildfire data
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;