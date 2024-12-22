'use client'
import { useContext, useEffect } from "react";
import { ContextProvider } from "@/app/page";
import Roaming from "./Roaming";
import { MilkOff } from "lucide-react";

export default function ScrapeData() {
   const {products, loading} = useContext(ContextProvider);

   useEffect(() => {
    if (loading) {
       // Disable scrolling
       document.body.style.overflow = 'hidden';
    } else {
       // Re-enable scrolling
       document.body.style.overflow = 'auto';
    }

    // Cleanup when the component unmounts or loading changes
    return () => {
       document.body.style.overflow = 'auto';
    };
 }, [loading]);


  return (
    <div className="w-[90%] mx-auto">
       <div className="my-8">
          <h1 className="text-3xl text-center font-bold">Scrape Data From Amazon</h1>
          <p className="text-sm text-center text-slate-700 italic">List of product items from Amazon Store</p>
       </div>
      {/* Display loading state */}
      {loading ?  <Roaming /> : null}

      {/* Display product results */}
      <main className="relative">
          {
            products.length === 0 ? (
              <section className="flex flex-col justify-center items-center mt-[8em]">
                  <MilkOff className="text-slate-400" size={50}/>
                 <p className="text-2xl text-slate-400">Product list is empty.</p>
                 <p className="text-xl text-slate-800">Search any product from the search bar and click send</p>
              </section>
            ) : (
              <>
              <section className="grid grid-cols-1 gap-4">
                {products.map((product, index) => (
                  <aside key={index} className="bg-white p-4 h-44 shadow-sm rounded-md hover:outline hover:outline-sky-500">
                    <a href={product.url} target="_blank" rel="noopener noreferrer" className="flex h-full">
                        <div className="w-[20%] border-r border-slate-300 h-full relative">
                          <img src={product.imageCover} alt={product.title} width={100} className="absolute  h-full object-contain pr-4" />
                        </div>
                      <div className="w-full">
                        <p className="pl-4 pr-12">{product.title}</p>
                        <p className="ml-4 mt-4 p-1 bg-yellow-600 rounded-md text-sm w-fit">{product.price}</p>
                      </div>
                    </a>
                  </aside>
                ))}
            </section>
              </>
            )
          }
      </main>
    </div>
  )
}
