import "./globals.css";
import Navbar from "@/components/navbar";
import ScrollManager from "@/components/scrollmanager";
import Footer from "@/components/footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <ScrollManager />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}