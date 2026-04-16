// File: src/app/page.js
"use client";

import { useState } from "react";
import Image from "next/image";
import { categories, photos, packages } from "./data/portfolio";

export default function Home() {
  const [filter, setFilter] = useState("Semua");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  /*UNTUK HANDLE FITUR 'MUAT LEBIH BANYAK'*/

  // state untuk melacak jumlah foto yang ditampilkan (default 6)
  const [visibleCount, setVisibleCount] = useState(6);

  // fungsi untuk handle saat kategori diubah: harus me-reset jumlah foto yang ditampilkan kembali ke nilai default yaitu 6
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setVisibleCount(6);
  };

  // filter semua gambar sesuai kategori
  const allFilteredImage =
    filter === "Semua"
      ? photos
      : photos.filter((img) => img.category === filter);

  // potong gambar hanya sebanyak 'visibleCount'
  const displayedImages = allFilteredImage.slice(0, visibleCount);

  // Filter gambar otomatis tanpa perlu loading internet
  const filteredImages =
    filter === "Semua"
      ? photos
      : photos.filter((img) => img.category === filter);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* HERO SECTION */}
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1595152452543-e5fc28ebc2b8?q=80&w=800&auto=format&fit=crop')] 
             md:bg-[url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop')]"
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Roganda Photo</h1>
          <p className="text-xl mb-8">Abadikan momen anda bersama kami</p>
          <div className="flex justify-center gap-4">
            <a
              href="#portfolio"
              className="px-6 py-3 bg-red-600 rounded-xl font-semibold hover:bg-red-700 transition"
            >
              Hasil foto
            </a>
            <button
              onClick={() => setIsOpen(true)}
              className="px-6 py-3 bg-green-600 rounded-xl font-semibold hover:bg-green-700 transition"
            >
              Hubungi Kami
            </button>
          </div>
        </div>
      </section>

      {/* PORTFOLIO/GALERI SECTION */}
      <section
        id="portfolio"
        className="py-16 px-6 md:px-20 max-w-7xl mx-auto min-h-screen"
      >
        <div className="text-center mb-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Galeri</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Filter</p>
        </div>

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
              className={`px-5 py-2 rounded-full font-semibold shadow-lg transition ${filter === cat.name ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid Foto */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {displayedImages.map((img) => (
            <div
              key={img.id}
              className="relative h-64 w-full rounded-xl overflow-hidden cursor-pointer group shadow-lg"
              onClick={() => setSelectedImage(img.imageUrl)}
            >
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

        {/* Tombol 'Muat lebih banyak' */}
        <div className="flex justify-center mt-8">
          {visibleCount < allFilteredImage.length ? (
            <button
              onClick={() => setVisibleCount(visibleCount + 6)}
              className="px-8 py-3 border-2 border-red-600 text-red-600 font-bold rounded-full hover:bg-red-600 hover:text-white transition duration-300 shadow-md"
            >
              Muat lebih banyak
            </button>
          ) : (
            <p className="text-gray-500 italic font-medium">
              — Semua foto telah dimuat —
            </p>
          )}
        </div>
      </section>

      {/* PACKAGE SECTION */}
      <section
        id="package"
        className="py-16 px-6 md:px-20 max-w-7xl mx-auto min-h-screen"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Paket Liputan
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Paket liputan berikut untuk adat pernikahaan batak, selain itu
            tanyakan terlebih dahulu.
          </p>
        </div>

        {/* Grid 3 Kolom untuk Kartu */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-white rounded-3xl p-8 transition duration-300 ${
                pkg.isPopular
                  ? "border-4 border-green-500 shadow-2xl scale-100 md:scale-105 z-10" // Desain menonjol untuk paket terlaris
                  : "border border-gray-200 shadow-lg hover:shadow-xl"
              }`}
            >
              {/* Label Rekomendasi */}
              {pkg.isPopular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide shadow-md">
                  PALING DIMINATI
                </div>
              )}

              <h3 className="text-2xl font-bold text-gray-800 text-center mb-2">
                {pkg.name}
              </h3>
              <div className="text-center mb-6">
                <span className="text-4xl font-extrabold text-gray-900">
                  {pkg.price}
                </span>
              </div>

              <div className="space-y-4 mb-8">
                {pkg.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    {/* Ikon Ceklis */}
                    <svg
                      className="w-6 h-6 text-green-500 mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>

                    <div className="flex-1">
                      <span className="text-gray-700">{benefit.text}</span>

                      {/* Tombol Lihat Contoh (Hanya muncul kalau ada sampleImage) */}
                      {benefit.sampleImage && (
                        <button
                          onClick={() => setSelectedImage(benefit.sampleImage)}
                          className="ml-2 inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 px-2 py-1 rounded-md transition"
                        >
                          📸 Lihat Contoh
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setIsOpen(true)}
                className={`w-full py-4 rounded-xl font-bold transition duration-300 ${
                  pkg.isPopular
                    ? "bg-green-600 text-white hover:bg-green-700 shadow-green-500/30 shadow-lg"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                Pilih Paket Ini
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL GAMBAR */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-4xl h-[80vh]">
            <Image
              src={selectedImage}
              alt="Perbesar Foto"
              fill
              className="object-contain"
            />
            <button className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-red-600 text-xl font-bold">
              ✕
            </button>
          </div>
        </div>
      )}

      {/* MODAL KONTAK */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-96 p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 font-bold text-xl"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-2 text-center text-black">
              Hubungi Kami
            </h2>
            <p className="text-red-600 mb-6 text-center text-sm">
              Tanyakan ketersediaan jadwal untuk acara anda.
            </p>
            <a
              href="https://wa.me/628153857185"
              target="_blank"
              rel="noreferrer"
              className="block w-full py-3 text-center bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition"
            >
              Chat via WhatsApp
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
