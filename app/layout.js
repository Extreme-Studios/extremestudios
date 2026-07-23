import "./globals.css";
import AudioFeedback from "@/components/AudioFeedback";

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
      <head>
        <meta name="google-adsense-account" content="ca-pub-8451272966172172" />
      </head>
      <body><AudioFeedback />{children}</body>
    </html>
  );
}
