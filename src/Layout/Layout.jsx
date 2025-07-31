import React from "react";
import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;