import React from "react";

export default function Sidebar() {
  return (
    <aside style={{ 
      width: "250px", 
      backgroundColor: "#f5efe6", 
      padding: "1rem", 
      height: "100vh",
      boxSizing: "border-box"
    }}>
      <h2>StudyHub</h2>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>Dashboard</li>
          <li>Notes</li>
          <li>Flashcards</li>
          <li>Resources</li>
        </ul>
      </nav>
    </aside>
  );
}