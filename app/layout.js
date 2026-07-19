import "./globals.css";

export const metadata = {
  title: "Extreme Studios | AI Engineering & Software Development",
  description: "Extreme Studios adalah studio teknologi yang berfokus pada AI Engineering, Software Development, pengembangan aplikasi Android, web application, automation, dan solusi teknologi digital.",
  openGraph: {
    title: "Extreme Studios",
    description: "AI Engineering & Software Development",
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
