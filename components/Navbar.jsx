'use client'

import { Search, SendHorizonal } from "lucide-react";
import { Aperture } from "react-feather";
import { useContext } from "react";
import { ContextProvider } from "@/app/page";

export default function Navbar() {
       const {products, setProducts, searchTerm, setSearchTerm, loading, setLoading} = useContext(ContextProvider);
    
    const handleSearch = async (event) => {
        event.preventDefault();
        setLoading(true);
        // Fetch data from the API route with the search term
        const res = await fetch(`/api/scrape?search_term=${searchTerm}`);
        const data = await res.json(); 
        setProducts(data);
        setLoading(false);
      };
  return (
    <div>
        <header className="w-screen bg-white border-[1px] border-slate-300 h-12">
            <nav className="flex justify-start w-[90%] h-full mx-auto items-center ">
                <div id="logo" className="mr-10">
                    <Aperture className="text-sky-500"/>
                </div>
                <div id="search-field">
                <form className="flex w-full" onSubmit={handleSearch}>
                    <label className="relative block w-full">
                        <span className="sr-only">Search</span>
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <Search className="w-4 h-4 text-slate-400"/>
                        </span>
                        <input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter product name" className="placeholder:italic placeholder:text-slate-400 inline-block bg-white w-full border border-slate-300 rounded-md py-1 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"  type="text" name="search"/>
                        </label>
                    
                        <button type="submit" className="inline-block">
                        <SendHorizonal className="text-sky-500 ml-2" />
                    </button>

                </form>
                </div>
            </nav>
        </header>
    </div>
  )
}
