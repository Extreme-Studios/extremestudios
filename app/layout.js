import "./globals.css";
import AudioFeedback from "@/components/AudioFeedback";

export const metadata = {
  title: "Extreme Studios | AI, Web & Software Development",
  description: "Extreme Studios membangun Artificial Intelligence, website, software, aplikasi Android, dan solusi digital yang berdampak nyata.",
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined
  },
  openGraph: {
    title: "Extreme Studios",
    description: "AI, Web & Software Development",
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body><AudioFeedback />{children}</body>
    </html>
  );
}
