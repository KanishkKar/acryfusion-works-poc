'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function() {
    const [query, setQuery] = useState('');
    const router = useRouter();
    
    function handleOnClick() {
        if(query) router.push(`/search?query=${query}`);
    }

    return (
        <div className="relative">
          <label htmlFor="Search" className="sr-only"> Search for... </label>

          <input
            type="text"
            id="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search.."
            className="placeholder:italic placeholder:text-slate-500 placeholder:dark:text-slate-200 bg-slate-100 dark:bg-slate-700 w-full rounded-md py-2.5 pe-10 pl-2 shadow-sm text-slate-500 dark:text-slate-100 sm:text-sm border-slate-200 dark:border-slate-100"/>

          <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
            <button
              type="button"
              onClick={handleOnClick}
              className="text-slate-600 hover:text-slate-700 dark:text-slate-100 dark:hover:text-slate-300">
              <span className="sr-only">Search</span>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
          </span>
        </div>
    );
}