// File: src/app/page.js
"use client";

import { useState } from "react";
import Image from "next/image";
import { categories, photos } from "./data/portfolio"; // Import langsung dari file data!

export default function Home() {
  const [filter, setFilter] = useState("Semua");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Filter gambar otomatis tanpa perlu loading internet
  const filteredImages = filter === "Semua" 
    ? photos 
    : photos.filter(img => img.category === filter);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1595152452543-e5fc28ebc2b8?q=80&w=800&auto=format&fit=crop')] 
             md:bg-[url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop')]">
              <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Roganda Photo</h1>
          <p className="text-xl mb-8">Abadikan momen anda bersama kami</p>
          <div className="flex justify-center gap-4">
            <a href="#portfolio" className="px-6 py-3 bg-red-600 rounded-xl font-semibold hover:bg-red-700 transition">
              Hasil foto
            </a>
            <button onClick={() => setIsOpen(true)} className="px-6 py-3 bg-green-600 rounded-xl font-semibold hover:bg-green-700 transition">
              Hubungi Kami
            </button>
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section id="portfolio" className="py-16 px-6 md:px-20 max-w-7xl mx-auto h-screen">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-500">Galeri</h2>
        
        {/* Tombol Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button 
            onClick={() => setFilter("Semua")}
            className={`px-5 py-2 rounded-full font-semibold transition ${filter === "Semua" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          >
            Semua
          </button>
          {categories.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setFilter(cat.name)}
              className={`px-5 py-2 rounded-full font-semibold transition ${filter === cat.name ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid Foto */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredImages.map((img) => (
            <div key={img.id} className="relative h-64 w-full rounded-xl overflow-hidden cursor-pointer group" onClick={() => setSelectedImage(img.imageUrl)}>
              <Image 
                src={img.imageUrl} 
                alt={img.title} 
                fill
                className="object-cover group-hover:scale-110 transition duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                <span className="text-white font-semibold">{img.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="package" className="py-16 px-6 md:px-20 max-w-7xl mx-auto h-screen">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-500">Paket acara</h2>
      </section>

      {/* MODAL GAMBAR */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative w-full max-w-4xl h-[80vh]">
            <Image src={selectedImage} alt="Perbesar Foto" fill className="object-contain" />
            <button className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-red-600 text-xl font-bold">✕</button>
          </div>
        </div>
      )}

      {/* MODAL KONTAK */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-96 p-6 relative">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-red-500 font-bold text-xl">✕</button>
            <h2 className="text-2xl font-bold mb-2 text-center">Hubungi Kami</h2>
            <p className="text-gray-600 mb-6 text-center text-sm">Tanyakan ketersediaan jadwal untuk acara spesial Anda.</p>
            <a href="https://wa.me/628153857185" target="_blank" rel="noreferrer" className="block w-full py-3 text-center bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition">
              Chat via WhatsApp
            </a>
          </div>
        </div>
      )}
    </main>
  );
}