import React from "react";
import { createRoot } from "react-dom/client";
import "./static.css";
import HomePage from "@/app/page";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>
);
