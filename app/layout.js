import "./globals.css";

export const metadata = {
  title: "Extreme Studios | AI Engineering & Software Development",
  description: "Extreme Studios adalah studio teknologi yang berfokus pada Artificial Intelligence, software, aplikasi Android, dan solusi digital yang berdampak nyata.",
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
