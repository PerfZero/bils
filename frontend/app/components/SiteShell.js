"use client";

import { useEffect, useState } from "react";
import AuthModal from "./AuthModal";
import Footer from "./Footer";
import Header from "./Header";
import MobileNavBar from "./MobileNavBar";
import MobileCatalogMenu from "./MobileCatalogMenu";
import { API_BASE_URL } from "../../config/api";

export default function SiteShell({ children }) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [catalogItems, setCatalogItems] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/categories/`);
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.results || [];
        setCatalogItems(items);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCatalogItems([]);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 568px)");
    const update = () => setIsMobile(media.matches);
    update();
    if (media.addEventListener) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }
    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  useEffect(() => {
    if (!isMobile && isCatalogOpen) {
      setIsCatalogOpen(false);
    }
  }, [isMobile, isCatalogOpen]);

  return (
    <div
      className={
        "a-page" +
        (isMobile && isCatalogOpen ? " a-page--catalog-mobile-open" : "")
      }
    >
      {isMobile && (
        <MobileCatalogMenu
          isOpen={isCatalogOpen}
          onClose={() => setIsCatalogOpen(false)}
          items={catalogItems}
        />
      )}
      <Header onProfileClick={() => setIsAuthOpen(true)} />
      <div className="page">
        {children}
        <Footer />
      </div>
      {isMobile && (
        <MobileNavBar
          onProfileClick={() => setIsAuthOpen(true)}
          onCatalogOpen={() => setIsCatalogOpen(true)}
        />
      )}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}
