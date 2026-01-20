import { Montserrat } from "next/font/google";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./globals.css";
import "./norm.css";
import SiteShell from "./components/SiteShell";
import Sprite from "./components/Sprite";

export const metadata = {
  title: "MMS Shop",
  description: "Online store",
};

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={montserrat.className}>
        <Sprite />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
