import React from "react";

function NavSideBar() {
  return (
    <div class="hidden lg:block fixed z-20 inset-0 top-[3.8125rem] left-[max(0px,calc(50%-45rem))] right-auto w-[19rem] pb-10 pl-8 pr-6 overflow-y-auto">
      <nav id="nav" class="lg:text-sm lg:leading-6 relative">
        <ul>
          <li>
            <a
              class="group flex items-center lg:text-sm lg:leading-6 mb-4 font-semibold text-sky-500 dark:text-sky-400"
              href="#productHeader"
            >
              <div class="mr-4 rounded-md ring-1 ring-slate-900/5 shadow-sm group-hover:shadow group-hover:ring-slate-900/10 dark:ring-0 dark:shadow-none dark:group-hover:shadow-none dark:group-hover:highlight-white/10 group-hover:shadow-sky-200 dark:group-hover:bg-sky-500 dark:bg-sky-500 dark:highlight-white/10">
                
              </div>
              Product
            </a>
          </li>
          <li>
            <a
              class="group flex items-center lg:text-sm lg:leading-6 mb-4 font-semibold text-sky-500 dark:text-sky-400"
              href="#propertyHeader"
            >
              <div class="mr-4 rounded-md ring-1 ring-slate-900/5 shadow-sm group-hover:shadow group-hover:ring-slate-900/10 dark:ring-0 dark:shadow-none dark:group-hover:shadow-none dark:group-hover:highlight-white/10 group-hover:shadow-sky-200 dark:group-hover:bg-sky-500 dark:bg-sky-500 dark:highlight-white/10">
                
              </div>
              Property
            </a>
          </li>          <li>
            <a
              class="group flex items-center lg:text-sm lg:leading-6 mb-4 font-semibold text-sky-500 dark:text-sky-400"
              href="#personaHeader"
            >
              <div class="mr-4 rounded-md ring-1 ring-slate-900/5 shadow-sm group-hover:shadow group-hover:ring-slate-900/10 dark:ring-0 dark:shadow-none dark:group-hover:shadow-none dark:group-hover:highlight-white/10 group-hover:shadow-sky-200 dark:group-hover:bg-sky-500 dark:bg-sky-500 dark:highlight-white/10">
                
              </div>
              Persona
            </a>
          </li>          <li>
            <a
              class="group flex items-center lg:text-sm lg:leading-6 mb-4 font-semibold text-sky-500 dark:text-sky-400"
              href="#reviewHeader"
            >
              <div class="mr-4 rounded-md ring-1 ring-slate-900/5 shadow-sm group-hover:shadow group-hover:ring-slate-900/10 dark:ring-0 dark:shadow-none dark:group-hover:shadow-none dark:group-hover:highlight-white/10 group-hover:shadow-sky-200 dark:group-hover:bg-sky-500 dark:bg-sky-500 dark:highlight-white/10">
                
              </div>
              Review
            </a>
          </li>

        </ul>
      </nav>
    </div>
  );
}

export default NavSideBar;
