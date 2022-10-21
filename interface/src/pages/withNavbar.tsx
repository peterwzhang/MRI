import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { ReactNode } from "react";
import HeroBanner from "../components/HeroBanner";
import Navbar from "../components/Navbar";
import "../styles/globals.css";

export default function withNavigation(page: ReactNode) {
  return (
    <>
      <HeroBanner />
      <Navbar />
      {page}
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
