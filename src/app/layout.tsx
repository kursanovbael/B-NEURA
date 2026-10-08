import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "B-NEURA — Beyond the Physical Body",
  description:
    "A conceptual Neuro-VR research and educational prototype exploring how brain-computer interfaces, AI, virtual reality, and sensory feedback could create new pathways between intention and experience.",
};

export const viewport: Viewport = {
  themeColor: "#05070a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <a
          href="#main-content"
          className="type-label bg-foreground text-background sr-only rounded-md focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-3"
        >
          Skip to main content
        </a>
        <main id="main-content" className="flex flex-1 flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
