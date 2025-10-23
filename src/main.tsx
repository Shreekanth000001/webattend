// main.tsx or index.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useLocation } from "react-router-dom";
import "./index.css";
import App from "./App";
import Login from "./login";
import Class from "./class";

function RouterHandler() {
  const location = useLocation();

  if (location.pathname === "/") {
    return <App />;
  } else if (location.pathname.startsWith("/login")) {
    return <Login />;
  }
  else if (location.pathname.startsWith("/submitclass")) {
    return <Class />;
  }

  return <div>404 - Not Found</div>;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <RouterHandler />
    </BrowserRouter>
  </StrictMode>
);
