// File: src/data/portfolio.js

export const categories = [
  { id: 1, name: "Pernikahan" },
  { id: 2, name: "Aqiqah" },
  { id: 3, name: "Monding" },
];

export const photos = [];

export const packages = [
  {
    id: 1,
    name: "Pernikahan",
    price: "Rp 2.500.000",
    isPopular: false,
    benefits: [
      { text: "1 orang fotografer", sampleImage: null },
      { text: "1 orang videografer", sampleImage: null },
      { text: "2 set foto + frame ukuran 40x50cm", sampleImage: null },
      { text: "Album foto 15 sheet", sampleImage: null },
      { text: "Flashdisk (berisi foto dan video)", sampleImage: null },
    ],
  },
  {
    id: 2,
    name: "Pesta adat/sulang-sulang pahompu",
    price: "Rp 2.500.000",
    // isPopular: true, // Kita akan beri highlight khusus untuk paket ini
    benefits: [
      { text: "1 orang fotografer", sampleImage: null },
      { text: "1 orang videografer", sampleImage: null },
      { text: "2 set foto + frame ukuran 40x50cm", sampleImage: null },
      { text: "Album foto 15 sheet", sampleImage: null },
      { text: "Flashdisk (berisi foto dan video)", sampleImage: null },
    ],
  },
  {
    id: 3,
    name: "Meninggal/monding",
    price: "Rp 2.000.000",
    isPopular: false,
    benefits: [
      { text: "1 orang fotografer", sampleImage: null },
      { text: "1 orang videografer", sampleImage: null },
      { text: "Album foto 12 sheet", sampleImage: null },
      { text: "Flashdisk (berisi foto dan video)", sampleImage: null },
    ],
  },
];
