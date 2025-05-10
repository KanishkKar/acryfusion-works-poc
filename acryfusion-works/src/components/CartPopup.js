'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useCart } from '@/context/CartContext';

export default function CartPopup() {
    const {isOpen, setIsOpen} = useCart();
    const {cart, removeFromCart} = useCart();

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-slate-200 dark:bg-slate-600 shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-slate-900 dark:text-slate-100">Cart</DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="relative -m-2 p-2 text-slate-400 dark:text-slate-100 hover:text-slate-500 dark:hover:text-slate-300"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <svg aria-hidden="true" className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-slate-200">
                        {cart.map((item) => (
                          <li key={item.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-slate-200">
                              <img
                                alt={item.imageAlt}
                                src={item.imageSrc}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-slate-900 dark:text-slate-100">
                                  <h3>
                                    <a href={item.href}>{item.name}</a>
                                  </h3>
                                  <p className="ml-4">{item.price}</p>
                                </div>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-100">{item.color}</p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-slate-500">Qty {item.quantity}</p>

                                <div className="flex">
                                  <button type="button" className="font-medium text-slate-600 hover:text-slate-500 dark:text-slate-100 dark:hover:text-slate-300" onClick={() => removeFromCart(item.id)}>
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-slate-900 dark:text-slate-100">
                    <p>Subtotal</p>
                    <p>₹{(cart && cart.length >0) ? cart.reduce((sum,i) => sum + i.price) : 0.0}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-300">Shipping and taxes calculated at checkout.</p>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="flex items-center justify-center rounded-md border border-transparent bg-slate-600 dark:bg-slate-300 px-6 py-3 text-base font-medium text-slate-100 dark:text-slate-900 shadow-sm hover:bg-slate-700"
                    >
                      Checkout
                    </a>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-slate-500 dark:text-slate-100">
                    <p>
                      or{' '}
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="font-medium text-slate-600 hover:text-slate-500 dark:text-slate-100 dark:hover:text-slate-300"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
