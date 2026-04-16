// File: src/data/portfolio.js

export const categories = [
  { id: 1, name: "Pernikahan" },
  { id: 2, name: "Aqiqah" },
  { id: 3, name: "Monding" },
];

export const photos = [
  {
    id: 101,
    category: "Pernikahan",
    title: "Liputan Wedding",
    imageUrl:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 102,
    category: "Aqiqah",
    title: "Pas Foto Studio",
    imageUrl:
      "https://res.cloudinary.com/dog13cr0h/image/upload/f_auto,q_auto/DSC_0024_f1qmd4",
  },
  {
    id: 103,
    category: "Monding",
    title: "Cetak Blanko Undangan",
    imageUrl:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 104,
    category: "Pernikahan",
    title: "Liputan Wedding",
    imageUrl:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 105,
    category: "Aqiqah",
    title: "Pas Foto Studio",
    imageUrl:
      "https://images.unsplash.com/photo-1595152452543-e5fc28ebc2b8?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 106,
    category: "Monding",
    title: "Cetak Blanko Undangan",
    imageUrl:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 107,
    category: "Pernikahan",
    title: "Liputan Wedding",
    imageUrl:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 108,
    category: "Aqiqah",
    title: "Pas Foto Studio",
    imageUrl:
      "https://images.unsplash.com/photo-1595152452543-e5fc28ebc2b8?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 109,
    category: "Monding",
    title: "Cetak Blanko Undangan",
    imageUrl:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 110,
    category: "Pernikahan",
    title: "Liputan Wedding",
    imageUrl:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 111,
    category: "Aqiqah",
    title: "Pas Foto Studio",
    imageUrl:
      "https://images.unsplash.com/photo-1595152452543-e5fc28ebc2b8?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 112,
    category: "Monding",
    title: "Cetak Blanko Undangan",
    imageUrl:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
  },
];

export const packages = [
  {
    id: 1,
    name: "Paket Silver",
    price: "Rp 1.500.000",
    isPopular: false,
    benefits: [
      { text: "1 Fotografer Profesional", sampleImage: null },
      { text: "Waktu Liputan 6 Jam", sampleImage: null },
      { text: "Semua File Asli (Flashdisk)", sampleImage: null },
      {
        text: "1 Cetak Pembesaran 12R + Bingkai",
        sampleImage:
          "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
      }, // Contoh foto bingkai
    ],
  },
  {
    id: 2,
    name: "Paket Gold",
    price: "Rp 2.500.000",
    isPopular: true, // Kita akan beri highlight khusus untuk paket ini
    benefits: [
      { text: "1 Fotografer & 1 Videografer", sampleImage: null },
      { text: "Waktu Liputan 8 Jam", sampleImage: null },
      { text: "Video Cinematic 1 Menit", sampleImage: null },
      {
        text: "1 Album Kolase Eksklusif 10 Sheet",
        sampleImage:
          "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop",
      }, // Contoh foto album
      {
        text: "Cetak Pembesaran 16R + Bingkai",
        sampleImage:
          "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
  {
    id: 3,
    name: "Paket Platinum",
    price: "Rp 4.000.000",
    isPopular: false,
    benefits: [
      { text: "2 Fotografer & 1 Videografer", sampleImage: null },
      { text: "Waktu Liputan Full Day", sampleImage: null },
      { text: "Video Cinematic 3 Menit", sampleImage: null },
      {
        text: "2 Album Kolase Premium (Box Koper)",
        sampleImage:
          "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop",
      },
      {
        text: "Cetak Pembesaran 20R + Bingkai",
        sampleImage:
          "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
];
