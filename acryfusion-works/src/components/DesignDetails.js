'use client'

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Radio, RadioGroup } from '@headlessui/react'
import { StarIcon } from '@heroicons/react/20/solid'

const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DesignDetails() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [design, setDesign] = useState({});
  const [selectedMaterial, setselectedMaterial] = useState('White');
  const [selectedSize, setSelectedSize] = useState('XS')
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchDesignById() {
      try {
        if (id) {
          const result = await fetch(`/api/design-details?id=${id}`);
          if (!result.ok) {
            throw new Error(`HTTP error! status: ${result.status}`);
          }
          const data = await result.json();
          if(design) setDesign(data)
          else throw new Error('No data found!');
          if(design.materials && design.materials.length > 0) setselectedMaterial(data.materials[0]);
          if(design.dimensions && design.dimensions.length > 0) setSelectedSize(data.dimensions[2]);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
  }
  
  useEffect(() => {
    fetchDesignById();
  }, [id]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-slate-100 dark:bg-slate-950">
      <div className="pt-6">
        {/* Image gallery */}

        {/* design info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-slate-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{design.name}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Design information</h2>
            <p className="text-3xl tracking-tight text-slate-900">{design.price}</p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(
                        reviews.average > rating ? 'text-slate-900' : 'text-slate-200',
                        'h-5 w-5 flex-shrink-0',
                      )}
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a href={reviews.href} className="ml-3 text-sm font-medium text-slate-600 hover:text-slate-500">
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>

            <form className="mt-10">
              {/* Materials */}
              <div>
                <h3 className="text-sm font-medium text-slate-900">Color</h3>

                <fieldset aria-label="Choose the material" className="mt-4">
                  <RadioGroup value={selectedMaterial} onChange={setselectedMaterial} className="flex items-center space-x-3">
                    {()=> { if(design && design.materials && design.materials.length > 0) {
                      design.materials.map((material) => (
                      <Radio
                        key={material.name}
                        value={material}
                        aria-label={material.name}
                        className={classNames(
                          material.selectedClass,
                          'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1',
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            material.class,
                            'h-8 w-8 rounded-full border border-black border-opacity-10',
                          )}
                        />
                      </Radio>
                    ))}}}
                  </RadioGroup>
                </fieldset>
              </div>

              {/* Dimensions */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-slate-900">Size</h3>
                  <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-500">
                    Size guide
                  </a>
                </div>

                <fieldset aria-label="Choose a size" className="mt-4">
                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                  >
                    {()=> { if(design && design.dimensions && design.dimensions.length > 0) 
                    {design.dimensions.map((dimension) => (
                      <Radio
                        key={dimension.name}
                        value={dimension}
                        disabled={!dimension.inStock}
                        className={classNames(
                          dimension.inStock
                            ? 'cursor-pointer bg-slate text-slate-900 shadow-sm'
                            : 'cursor-not-allowed bg-slate-50 text-slate-200',
                          'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-slate-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-slate-500 sm:flex-1 sm:py-6',
                        )}
                      >
                        <span>{dimension.name}</span>
                        {dimension.inStock ? (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-slate-500"
                          />
                        ) : (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-slate-200"
                          >
                            <svg
                              stroke="currentColor"
                              viewBox="0 0 100 100"
                              preserveAspectRatio="none"
                              className="absolute inset-0 h-full w-full stroke-2 text-slate-200"
                            >
                              <line x1={0} x2={100} y1={100} y2={0} vectorEffect="non-scaling-stroke" />
                            </svg>
                          </span>
                        )}
                      </Radio>
                    ))}}}
                  </RadioGroup>
                </fieldset>
              </div>

              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-slate-600 px-8 py-3 text-base font-medium text-slate hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              >
                Add to bag
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-slate-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-slate-900">{design.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-slate-900">pointers</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                {()=> { if(design && design.pointers && design.pointers.length > 0) {{design.pointers.map((item) => (
                    <li key={item} className="text-slate-400">
                      <span className="text-slate-600">{item}</span>
                    </li>
                  ))}}}}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-slate-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-slate-600">{design.details}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
