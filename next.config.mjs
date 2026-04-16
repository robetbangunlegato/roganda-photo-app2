/** @type {import('next').Config} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // Izin untuk gambar Cloudinary (Tambahkan blok ini)
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
