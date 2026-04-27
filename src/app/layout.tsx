import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: "TREVORORS LABS",
    template: "%s | TREVORORS LABS",
  },
  description:
    "Performance-based developer training and selection platform. Join the Foundation or Builder track to build real skills, earn verified certificates, and get hired.",
  keywords: [
    "developer training", "coding bootcamp India", "tech education", "builder program",
    "foundation track", "software engineering course", "certificate verification",
    "junior developer program", "project-based learning", "developer selection"
  ],
  authors: [{ name: "TREVORORS LABS", url: "https://trevoros.com" }],
  creator: "TREVORORS LABS",
  publisher: "TREVORORS LABS",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "TREVORORS LABS",
    title: "TREVORORS LABS — Developer Training & Selection",
    description:
      "Performance-based developer training and selection platform. Build real skills, prove your ability, get hired.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TREVORORS LABS — Developer Training & Selection",
    description: "Performance-based developer training. Build. Prove. Get hired.",
    creator: "@trevoros_labs",
  },
  verification: {
    // Add these once you register:
    // google: 'your_google_site_verification_token',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'} />
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
