import "./globals.css";
import Navbar from "@/components/navbar";
import ScrollManager from "@/components/scrollmanager";
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <ScrollManager />
        <Navbar />
        {children}
      </body>
    </html>
  );
}