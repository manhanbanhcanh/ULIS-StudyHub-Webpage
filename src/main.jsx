import React from "react";
import ReactDOM from "react-dom/client";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Mount React components to corresponding divs
ReactDOM.createRoot(document.getElementById("sidebar-root")).render(<Sidebar />);
ReactDOM.createRoot(document.getElementById("header-root")).render(<Header />);
ReactDOM.createRoot(document.getElementById("footer-root")).render(<Footer />);