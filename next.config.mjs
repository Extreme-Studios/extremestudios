/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/diana-cs-avatar.png",
        destination: "https://drive.google.com/uc?export=view&id=19OzRTDTWtGnfKg0m5tE-Nqb_zTc7dE2y",
        permanent: false
      }
    ];
  }
};

export default nextConfig;
