'use client'

import { useEffect, useState } from 'react';
import DesignCatalogue from './DesignCatalogue';

export default function DesignCollection() {
  const [designs, setDesigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [count, setCount] = useState(0);
  const [sortBy, setSortBy] = useState('sortId');
  const designsPerPage = 4;

  async function fetchDesigns() {
    try {
      const result = await fetch(`/api/designs?page=${currentPage}&limit=${designsPerPage}&sortBy=${sortBy}`);
      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }
      const data = await result.json()
      setPages(data.pages);
      setCount(data.count);
      setDesigns(data.designs);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchDesigns();
  }, [currentPage, sortBy]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
        <section>
            <div className="mt-2 sm:flex sm:items-center sm:justify-between">
              <div className="block">
                <label htmlFor="SortBy" className="sr-only">SortBy</label>
                <select id="SortBy" onChange={(e)=> setSortBy(e.target.value)} value={sortBy} className="h-10 rounded pl-2 bg-slate-100 dark:bg-slate-700 text-sm text-slate-500 dark:text-slate-100 border-0 border-b-2 border-slate-400 dark:border-slate-100">
                  <option>Sort By</option>
                  <option value="Pop">Popularity</option>
                  <option value="New">Newest</option>
                  <option value="PLtoH">Price low to high</option>
                  <option value="PHtoL">Price high to low</option>
                </select>
              </div>
            </div>
            <DesignCatalogue designs={designs} currentPage={currentPage} pages={pages} count={count} setCurrentPage={setCurrentPage} />
        </section>
    );
}