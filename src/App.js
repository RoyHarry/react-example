import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts";
import { AdminRouter, WebRouter } from "./routers";

export default function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <WebRouter/>
      <AdminRouter/>
    </BrowserRouter>
    </AuthProvider>
  );
}
  