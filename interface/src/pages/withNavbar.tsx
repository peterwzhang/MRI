import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { ReactNode } from "react";
import HeroBanner from "../components/HeroBanner";
import Navbar from "../components/Navbar";
import SshBanner from "../components/SshBanner";
import "../styles/globals.css";

export default function withNavigation(page: ReactNode) {
  return (
    <>
      <HeroBanner />
      <Navbar />
      <SshBanner />
      {page}
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
