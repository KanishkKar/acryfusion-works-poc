import Image from 'next/image'
import { useRouter } from "next/navigation";

export default function({designs, currentPage, pages, count, setCurrentPage}) {
    const router = useRouter();

    function handleDesignClick(id) {
        if(id) router.push(`/design?id=${id}`);
    }
    function handlePageChangeClick(pageNumber){
      setCurrentPage(pageNumber);
    }

    return (
        <div className="mx-auto max-w-screen-xl px-4 py-8">
          <div className="flex justify-between">
            <div className="mt-8 justify-items-start">
              <p className="text-sm text-slate-500">Showing page <span> {currentPage} </span> of {pages}</p>
            </div>
          <div className="mt-8 justify-items-end">
            <p className="text-sm text-slate-500">Total <span> {count} </span> designs</p>
          </div>
        </div>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {designs.map((data) => (
              <li key={data.id}>
                  <a href="#" className="group relative block overflow-hidden rounded" onClick={() => handleDesignClick(data.id)}>
                    <div className="relative h-64 w-64 sm:h-72 object-cover transition duration-500 group-hover:scale-105" >
                      <Image
                        src={data.imageSrc}
                        alt={data.imageAlt}
                        layout="fill" 
                        objectFit="cover" 
                      />
                    </div>

                    <div className="relative border border-slate-300 bg-slate-200 p-6">
                      {data.tags.map((tag) => (
                        <span key={tag} className="whitespace-nowrap m-1 bg-stone-300 px-3 py-1.5 text-xs text-stone-600 font-medium"> {tag} </span>
                      ))}

                      <h3 className="mt-4 text-lg font-medium text-slate-900">{data.name}</h3>
              
                      <p className="mt-1.5 text-sm text-slate-700">{data.price}</p>
                    </div>
                  </a>
              </li>
          ))}
        </ul>

        <ol className="mt-8 flex justify-center gap-1 text-xs font-medium">
          <li>
            <a href="#" className="inline-flex size-8 items-center justify-center text-slate-500 hover:text-slate-400" onClick={() => handlePageChangeClick(pages - currentPage + 1)}>
              <span className="sr-only">Prev Page</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
              </svg>
            </a>
          </li>
          {Array.from({ length: pages }, (_, index) => (
            <li key={index + 1}>
              <a className="block size-8 rounded border border-slate-200 text-center text-slate-600 hover:text-slate-400 leading-8" href="#" onClick={() => handlePageChangeClick(index + 1)}>
                {index + 1}
              </a>
            </li>
          ))}
          <li>
            <a href="#" className="inline-flex size-8 items-center justify-center text-slate-500 hover:text-slate-400" onClick={() => handlePageChangeClick(pages - (currentPage - 1))}>
              <span className="sr-only">Next Page</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
              </svg>
            </a>
          </li>
        </ol>
      </div>
    );
}