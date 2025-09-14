"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Detection {
  label: string;
  confidence: number;
}

const AIImageClassifier = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [results, setResults] = useState<Detection[] | null>(null);
  const [loading, setLoading] = useState(false);
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

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    setSelectedFile(file);
    await sendFile(file);
    e.target.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
    await sendFile(selectedFile);
  };

  const sendFile = async (file: File) => {
    setLoading(true);
    setResults(null);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/ai_classifier", {
        method: "POST",
        body: formData,
      });
      const json = await response.json();
      if (json.detections && json.detections.length > 0) {
        setResults(json.detections);
      } else {
        setResults([{ label: "No detection", confidence: 0 }]);
      }
    } catch (err) {
      setResults([{ label: "Error", confidence: 0 }]);
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-black text-white font-inter overflow-hidden">
      {/* Ember/Sparks Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      ></canvas>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-extrabold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            HELIO
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
      {/* Hero / Form */}
      <div className="relative flex flex-col items-center justify-center px-4 pt-28 z-10">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-8 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-transparent bg-clip-text">
          AI Image Classifier
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4 items-center mb-8"
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="cursor-pointer text-sm text-white file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0 file:text-sm file:font-semibold
                      file:bg-orange-600 file:text-white hover:file:bg-orange-700
                      file:placeholder-white"
          />
          <button
            type="submit"
            disabled={loading || !selectedFile}
            className="relative px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg font-semibold uppercase tracking-wider transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/50 hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Classifying..." : "Classify Image"}
          </button>
        </form>

        {/* Results */}
        {results && (
          <div className="bg-gray-900/50 p-8 rounded-2xl border border-orange-500/20 backdrop-blur-sm mb-8 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            <ul className="space-y-2">
              {results[0] && results[0].confidence > 0.5 ? (
                <li className="flex justify-between items-center">
                  <span className="font-bold bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-transparent bg-clip-text">
                    {results[0].label}
                  </span>
                  <span className="text-gray-300">
                    {(results[0].confidence * 100).toFixed(2)}%
                  </span>
                </li>
              ) : (
                <li className="text-gray-400 italic text-center">No wildfire</li>
              )}
            </ul>
          </div>
        )}

        {/* Image Preview */}
        <div className="max-w-md w-full">
          {selectedFile ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Uploaded preview"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          ) : (
            <div className="text-gray-400 italic text-center">
              Upload an image to preview here
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIImageClassifier;
