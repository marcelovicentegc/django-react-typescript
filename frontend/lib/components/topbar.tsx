import React from "react";
import { MegaMenu, Navbar } from "flowbite-react";
import { ROUTES, useRouter } from "../routes";

export function Topbar() {
  const { push } = useRouter();

  return (
    <MegaMenu>
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4 md:space-x-8 w-full">
        <Navbar.Brand className="cursor-pointer" onClick={() => push("/")}>
          <img
            alt="Django + React logo"
            src="/logo-512.png"
            className="mr-3 h-6 sm:h-9"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Django + React
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link
            onClick={() => push(ROUTES.LANDING_PAGE)}
            className="cursor-pointer"
          >
            Home
          </Navbar.Link>
          <Navbar.Link
            className="cursor-pointer"
            onClick={() => push(ROUTES.BLOG)}
          >
            Blog
          </Navbar.Link>
        </Navbar.Collapse>
      </div>
    </MegaMenu>
  );
}
