import "./globals.css";
import AudioFeedback from "@/components/AudioFeedback";

export const metadata = {
  title: "Extreme Studios | AI, Web & Software Development",
  description: "Extreme Studios membangun Artificial Intelligence, website, software, aplikasi Android, dan solusi digital yang berdampak nyata.",
  openGraph: {
    title: "Extreme Studios",
    description: "AI, Web & Software Development",
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <meta name="google-adsense-account" content="ca-pub-8451272966172172" />
      </head>
      <body><AudioFeedback />{children}</body>
    </html>
  );
}
