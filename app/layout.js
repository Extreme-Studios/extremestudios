import "./globals.css";

export const metadata = {
  title: "Extreme Studios | Digital Product Ecosystem",
  description: "Portfolio produk digital untuk UMKM, kreator, komunitas, dan distribusi konten digital.",
  openGraph: {
    title: "Extreme Studios",
    description: "Build Real Apps for Real Needs",
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
