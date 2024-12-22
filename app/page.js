"use client"

import Navbar from "@/components/Navbar";
import ScrapeData from "@/components/ScrapeData";

import { createContext, useState } from "react";

export const ContextProvider = createContext(null);

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("laptop"); // Default search term
  const [loading, setLoading] = useState(false);

  return (
    <main>
      <ContextProvider.Provider value={{products, setProducts, searchTerm, setSearchTerm, loading, setLoading}}>
        <Navbar />
       
          <ScrapeData />
       
      </ContextProvider.Provider>
    </main>
  );
}
