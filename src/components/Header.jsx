import React from "react";

export default function Header() {
  return (
    <header style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "1rem 2rem",
      backgroundColor: "#e8dfca"
    }}>
      <div id="side-menu">☰</div>
      <div id="logo">
        <img src="/img/logo.png" alt="ULIS StudyHub Logo" style={{ height: "40px" }} />
      </div>
    </header>
  );
}