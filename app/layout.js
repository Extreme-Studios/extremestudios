import "./globals.css";

export const metadata = {
  title: "Extreme Studios | AI Engineering, Android Development & AI Education",
  description: "Extreme Studios adalah AI Engineering Studio yang menyediakan pengembangan aplikasi Android, solusi AI, dan Pelatihan AI Engineer untuk siswa sekolah.",
  openGraph: {
    title: "Extreme Studios",
    description: "AI Engineering, Android Development & AI Education",
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
