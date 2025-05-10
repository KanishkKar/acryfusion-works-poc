'use client'

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DesignCatalogue from "@/components/DesignCatalogue";

export default function SearchGrid() {
    const searchParams = useSearchParams();
    const query = searchParams.get('query');
    const [designs, setDesigns] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(0);
    const [count, setCount] = useState(0);
    const designsPerPage = 4;

    useEffect(() => {
        if (query) {
          const fetchDesigns = async () => {
            const response = await fetch(`/api/search?page=${currentPage}&limit=${designsPerPage}&query=${query}`);
            const data = await response.json();
            setPages(data.pages);
            setCount(data.count);
            setDesigns(data.designs);
          };
    
          fetchDesigns();
        }
      }, [query, currentPage]);

    return(
        <div>
            <DesignCatalogue designs={designs} currentPage={currentPage} pages={pages} count={count} setCurrentPage={setCurrentPage} />
        </div>
    );
}