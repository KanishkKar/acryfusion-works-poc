import React, { Suspense } from 'react';
const { default: DesignDetails } = await import('@/components/DesignDetails.js');

export default function Design() {
    return (
      <div className="grid items-center justify-items-center min-h-screen p-4 pt-10 pb-10 gap-8 font-[family-name:var(--font-geist-sans)] bg-slate-100 dark:bg-slate-950">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <div>
            <Suspense fallback={<div>Loading Component A...</div>}>
              <DesignDetails />
            </Suspense>
          </div>
        </main>
      </div>
    );
}
