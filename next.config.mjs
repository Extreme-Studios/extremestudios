/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/diana-cs-avatar.png",
        destination: "https://lh3.googleusercontent.com/d/19OzRTDTWtGnfKg0m5tE-Nqb_zTc7dE2y",
        permanent: false
      }
    ];
  }
};

export default nextConfig;
