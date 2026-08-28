"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WatchlistProvider } from "@/context/WatchlistContext";
import Navbar from "@/components/layout/Navbar";
import React from "react";
const queryClient = new QueryClient();

const ReactClient = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <WatchlistProvider>
        <Navbar />
        {children}
      </WatchlistProvider>
    </QueryClientProvider>
  );
};

export default ReactClient;
