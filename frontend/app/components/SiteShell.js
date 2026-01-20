"use client";

import { useState } from "react";
import AuthModal from "./AuthModal";
import Footer from "./Footer";
import Header from "./Header";

export default function SiteShell({ children }) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <>
      <Header onProfileClick={() => setIsAuthOpen(true)} />
      <div className="page">
        {children}
        <Footer />
      </div>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
