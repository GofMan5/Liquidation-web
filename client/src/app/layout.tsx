import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/widgets/header/ui/header";
import { Footer } from "@/widgets/footer/ui/footer";
import { ThemeProvider } from "@/features/theme/model/theme-provider";
import { AuthProvider } from "@/features/auth/model/auth-provider";
import { CartProvider } from "@/entities/cart/model/cart-provider";
import { CartSheet } from "@/features/cart/ui/cart-sheet";

const montserrat = Montserrat({ 
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: {
    default: "Liquidation — Качественное программное обеспечение",
    template: "%s | Liquidation"
  },
  description: "Мы — команда профессионалов с многолетним опытом в разработке программного обеспечения. Создаем надежные, безопасные и современные решения для ваших задач.",
  keywords: ["software", "development", "liquidation", "tools", "automation", "secure software", "программное обеспечение", "разработка", "автоматизация"],
  authors: [{ name: "Liquidation Team" }],
  creator: "Liquidation Team",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://liquidation.dev",
    title: "Liquidation — Качественное программное обеспечение",
    description: "Профессиональные инструменты и программное обеспечение. Безопасно. Надежно. Эффективно.",
    siteName: "Liquidation",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Liquidation Software"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
  title: "Liquidation — Качественное программное обеспечение",
    description: "Профессиональные инструменты и программное обеспечение. Безопасно. Надежно. Эффективно.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${montserrat.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <CartProvider>
              <Header />
              <main className="flex-1 pt-16">
                {children}
              </main>
              <Footer />
              <CartSheet />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
