import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AdminRouter, WebRouter } from "./routers";

export default function App() {
  return (
    <BrowserRouter>
      <WebRouter/>
      <AdminRouter/>
    </BrowserRouter>
  );
}
  