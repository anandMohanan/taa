import Link from "next/link";
import { useContext } from "react";
import { useQuery } from "urql";
import { AuthContext } from "../context/authentication";

export const MenuBar = () => {
  const SITE_NAME = "The aesthete’s arena";
  const { user, login, logout } = useContext(AuthContext);

  const yes = user ? (
    <nav className="flex justify-between p-4 bg-menu-bar">
      <Link href="/about">
        <a className="text-text text-2xl font-bold">{SITE_NAME}</a>
      </Link>
      <menu className="flex">
        <Link href="/createPost">
          <a className="text-text text-lg font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </a>
        </Link>

        <Link href="/">
          <a className="ml-4 text-text text-lg font-bold" onClick={logout}>
            logout
          </a>
        </Link>
      </menu>
    </nav>
  ) : (
    <nav className="flex justify-between p-4  bg-menu-bar">
      <Link href="/about">
        <a className="text-text text-2xl font-bold">The aesthete’s arena</a>
      </Link>

      <div>
        <Link href="/register">
          <a className="text-text text-lg font-bold">register</a>
        </Link>
        <Link href="/login">
          <a className="ml-4 text-text text-lg font-bold">login</a>
        </Link>
      </div>
    </nav>
  );

  return yes;
};
