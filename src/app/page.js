// File: src/app/page.js
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { categories, packages } from "./data/portfolio";

export default function Home() {
  const [photos, setPhotos] = useState([]); // Buat state untuk menampung foto dari API
  const [loading, setLoading] = useState(true); // State loading
  const [filter, setFilter] = useState("Pernikahan");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [categories, setCategories] = useState([]); // state untuk kategori yang dinamis

  console.log(categories);

  // state untuk infinte scroll
  const [displayLimit, setDisplayLimit] = useState(12); //jumlah awal foto
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const sentinelRef = useRef(null); // elemen pengamat di bawah

  // Fungsi untuk mengambil data dari API Cloudinary
  useEffect(() => {
    async function fetchData() {
      try {
        const [photosResponse, foldersResponse] = await Promise.all([
          fetch("/api/photos"),
          fetch("/api/folders"),
        ]);

        const photosData = await photosResponse.json();

        const foldersData = await foldersResponse.json();

        // const filter = photosData.filter(
        //   (item) => item.asset_folder === "roganda-photo/Aqiqah",
        // );

        console.log("filtered data folder : ", foldersData);

        // Kita ubah format data Cloudinary ke format yang dipahami web kita
        const formattedPhotos = photosData.map((img, index) => {
          const watermark =
            "l_roganda-watermark_tegdf9,w_0.2,fl_relative,g_south_east,x_0.02,y_0.02,o_100";

          // 2. Buat DUA jenis optimasi
          // Untuk tampilan Grid luar (Ringan, maks 800px)
          const optGrid = "f_auto,q_auto,w_800,c_scale";

          // Untuk tampilan Modal Pop-up (Tajam, resolusi tinggi maks 1920px untuk layar monitor)
          const optModal = "f_auto,q_100,c_scale";

          // 3. Sisipkan ke dalam URL yang berbeda
          const urlGrid = img.secure_url.replace(
            "/upload/",
            `/upload/${optGrid}/${watermark}/`,
          );
          const urlModal = img.secure_url.replace(
            "/upload/",
            `/upload/${optModal}/${watermark}/`,
          );

          // 1. Ambil jalur mentah dari semua kemungkinan yang disediakan Cloudinary
          let rawPath = img.asset_folder || img.folder || "";

          // Jika dari sana kosong, kita ekstrak manual dari public_id
          if (!rawPath && img.public_id) {
            const parts = img.public_id.split("/");
            parts.pop(); // Buang elemen paling akhir (nama file foto)
            rawPath = parts.join("/");
          }

          // Saat ini, rawPath bisa berbentuk: "roganda-photo/Pernikahan Adat Batak" atau "Pernikahan Adat Batak"
          // 2. Kita pecah lagi berdasarkan tanda miring
          const pathParts = rawPath.split("/");

          // 3. Ambil SELALU bagian yang paling ujung/terakhir (Subfolder)
          let folderName = pathParts[pathParts.length - 1];

          // 4. Pengaman Akhir: Jika kosong, atau malah terambil folder induk utama
          if (!folderName || folderName === "roganda-photo") {
            folderName = "Lainnya";
          }

          // RAKIT JUDUL SEO OTOMATIS:
          const seoTitle = `Jasa Fotografer ${folderName} di Palembang - Roganda Photo Property No. ${index + 1}`;

          return {
            id: img.public_id,
            category: folderName,
            title: seoTitle,
            thumbnailUrl: urlGrid, // Gunakan ini untuk Grid
            modalUrl: urlModal, // Gunakan ini untuk Pop-up
          };
        });

        setPhotos(formattedPhotos);
        setCategories(foldersData);

        //set default filter ke kategori pernikahan
        if (foldersData.length > 0) {
          const defaultFilter = foldersData.includes("Pernikahan")
            ? "Pernikahan"
            : foldersData[0];
          setFilter(defaultFilter);
        }
        setLoading(false);
      } catch (error) {
        console.error("Gagal mengambil foto:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // filter berdasarkan kategori
  const filteredPhotos =
    filter === "roganda-photo/Pernikahan"
      ? photos
      : photos.filter((img) => img.category === filter);

  // data yang ditampilkan (potong sesuai displaylimit)
  const displayedPhotos = filteredPhotos.slice(0, displayLimit);
  const hasMore = displayLimit < filteredPhotos.length;

  //fungsi untuk menambah jumlah foto (dipanggil saat scroll mendekati bawah)
  const loadMore = useCallback(() => {
    if (!hasMore || isFetchingMore) return;
    setIsFetchingMore(true);
    // Simulasi delay (opsional, biar halus)
    setTimeout(() => {
      setDisplayLimit((prev) => prev + 12);
      setIsFetchingMore(false);
    }, 300);
  }, [hasMore, isFetchingMore]);

  // intersection observer untuk infinte scroll
  useEffect(() => {
    if (!sentinelRef.current || !hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.5, rootMargin: "100px" }, //mulai muat saat 100px sebelum sentinel terlihat
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  //reset limit saat kategori berubah
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setDisplayLimit(12);
  };

  // reset limit saat daftar foto berubah (misal setelah fetch selesai)
  useEffect(() => {
    setDisplayLimit(12);
  }, [filter, photos]);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 
      ==============
      HERO SECTION 
      ==============
      */}
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-center bg-[url('https://res.cloudinary.com/dog13cr0h/image/upload/v1776588435/DSC_2009_if1mig.jpg')] 
             md:bg-[url('https://res.cloudinary.com/dog13cr0h/image/upload/q_auto/f_auto/v1776588419/DSC_3199_cw9n1o.jpg')]"
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
      {/* 
      =========================
      PORTFOLIO/GALERI SECTION 
      =========================
      */}
      <section
        id="portfolio"
        className="py-16 px-6 md:px-20 max-w-7xl mx-auto min-h-screen"
      >
        <div className="text-center mb-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Galeri</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Filter</p>
        </div>
        {/* 
        =============================
        Tombol Filter 
        =============================
        */}
        {/* need fixing */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-5 py-2 rounded-full font-semibold shadow-lg transition ${filter === item ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            >
              {item}
            </button>
          ))}
        </div>
        {/* 
        ======================================
        Grid Foto - Gaya Masonry (Pinterest) 
        ======================================
        */}
        {loading ? (
          // 1. Tampilan saat Sedang Loading (Menunggu API Cloudinary)
          <div className="flex flex-col items-center justify-center py-20 w-full">
            {/* Animasi Spinner */}
            <div className="w-12 h-12 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-medium animate-pulse">
              Loading...
            </p>
          </div>
        ) : displayedPhotos.length > 0 ? (
          <>
            {/* 2. Tampilan Grid Foto - Gaya Masonry (Jika foto berhasil dimuat) */}
            <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6 mb-10 relative ">
              {displayedPhotos.map((img) => (
                <div
                  key={img.id}
                  className="relative w-full break-inside-avoid rounded-xl overflow-hidden cursor-pointer group shadow-lg"
                  onClick={() => setSelectedImage(img.modalUrl)}
                  // 1. Me-nonaktifkan klik kanan (context menu) pada areah gambar
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <Image
                    src={img.thumbnailUrl}
                    alt={img.title}
                    width={800}
                    height={600}
                    loading="lazy"
                    className="w-full h-auto object-cover group-hover:scale-105 transition duration-300 pointer-events-none select-none" // 2. pointer-events-none mematikan interaksi sentuh/tahan pada gambar
                    draggable="false" // 3. Mencegah gambar diseret (drag) ke tab baru
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                    <span className="text-white font-semibold">
                      {img.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {/* Sentinel element untuk infinite scroll */}
            {hasMore && (
              <div
                ref={sentinelRef}
                className="w-full h-10 flex justify-center items-center"
              >
                {isFetchingMore && (
                  <div className="w-6 h-6 border-2 border-gray-300 border-t-red-600 rounded-full animate-spin"></div>
                )}
              </div>
            )}
          </>
        ) : (
          // 3. Tampilan Kosong (Jika API tidak menemukan foto di kategori tersebut)
          <div className="flex justify-center items-center py-20 w-full">
            <p className="text-gray-500 italic font-medium">
              Belum ada foto untuk kategori ini.
            </p>
          </div>
        )}
      </section>
      {/* 
      =======================================================
      FLOATING ACTION BUTTON untuk membuka modal paket harga 
      =======================================================
      */}
      <button
        onClick={() => setIsPackageModalOpen(true)}
        className="fixed bottom-8 right-8 z-40 bg-red-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-2xl hover:bg-red-700 transition transform hover:scale-105 focus:outline-none"
        aria-label="Lihat Paket Harga"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 animate-bounce"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
          />
        </svg>

        {/* Atau gunakan teks: <span className="text-lg font-bold">Rp</span> */}
      </button>
      {/* 
      ==============================================
      MODAL PAKET HARGA (Package Section yang dulu) 
      ==============================================
      */}
      {isPackageModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setIsPackageModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 font-bold text-2xl z-10"
            >
              ✕
            </button>
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Paket Liputan
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Paket liputan berikut untuk adat pernikahan batak, selain itu
                tanyakan terlebih dahulu.
              </p>
            </div>

            {/* Grid 3 Kolom untuk Kartu Paket */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`relative bg-white rounded-3xl p-8 transition duration-300 ${
                    pkg.isPopular
                      ? "border-4 border-green-500 shadow-2xl scale-100 md:scale-105 z-10"
                      : "border border-gray-200 shadow-lg hover:shadow-xl"
                  }`}
                >
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
                        <svg
                          className="w-6 h-6 text-green-500 mr-3 shrink-0"
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
                          {benefit.sampleImage && (
                            <button
                              onClick={() =>
                                setSelectedImage(benefit.sampleImage)
                              }
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
                    onClick={() => {
                      setIsPackageModalOpen(false);
                      setIsOpen(true);
                    }}
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
          </div>
        </div>
      )}
      {/* 
      ================
      MODAL GAMBAR 
      ================
      */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
          // 1. Me-nonaktifkan klik kanan (context menu) pada areah gambar
          onContextMenu={(e) => e.preventDefault()}
        >
          <div className="relative w-full max-w-4xl h-[80vh]">
            <Image
              src={selectedImage}
              alt="Perbesar Foto"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              // style={{ objectFit: "cover" }}
              fill
              className="object-contain pointer-events-none select-none"
              draggable="false"
            />
            <button className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-red-600 text-xl font-bold">
              ✕
            </button>
          </div>
        </div>
      )}
      {/* 
      =============
      MODAL KONTAK 
      =============
      */}
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
