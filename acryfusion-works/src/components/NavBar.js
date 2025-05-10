import ThemeSwitcher from "./ThemeSwitcher";
import Search from "./Search";
import Link from "next/link";
import CartButton from "./CarButton";
import { CartProvider } from "@/context/CartContext";
import CartPopup from "./CartPopup";

export default function NavBar() {
  return (
    <header className="bg-slate-200 dark:bg-slate-900">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-4 px-4 md:gap-8 lg:px-8">
        <Link className="text-xl font-[family-name:var(--font-tva)] font-bold sm:text-2xl text-slate-600 dark:text-slate-100 transition hover:text-slate-400" href="/">
          ACRYFUSION WORKS
        </Link>
        <Search />
        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <Link className="text-slate-600 transition hover:text-slate-400 dark:text-slate-100 dark:hover:text-slate-300" href="/about">
                  About
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center gap-4">
            <div>
              <ThemeSwitcher/>
            </div>
            <div className="sm:flex sm:gap-4">
              <CartProvider>
                <CartButton />
                <CartPopup />
              </CartProvider>
              <a className="hidden sm:flex text-slate-600 dark:text-slate-100 transition hover:text-slate-400" href="#">
                <span className="sr-only">Profile</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            <button className="sm:flex rounded bg-slate-100 p-2.5 text-slate-600 transition hover:text-slate-400 md:hidden dark:bg-slate-800 dark:text-slate-100 dark:hover:text-slate-300">
              <span className="sr-only">Toggle menu</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}