import { useContext, useState } from "react";
import { formHooks } from "../util/hooks";
import { AuthContext } from "../context/authentication";
import { useRouter } from "next/router";
import { useMutation } from "urql";
import Head from "next/head";
import Link from "next/link";

import { LOGIN_MUTATION } from "../graphql/mutations";

export default function Login() {
  const context = useContext(AuthContext);

  const router = useRouter();
  const [errors, setErrors] = useState({});

  const initialState = {
    username: "",
    password: "",
  };
  const { onChange, onSubmit, values } = formHooks(
    loginUserCallback,
    initialState
  );
  const [result, loginUser] = useMutation(LOGIN_MUTATION);

  function loginUserCallback() {
    loginUser(values).then((result) => {
      if (result.error) {
        setErrors(result.error.graphQLErrors[0].extensions.errors);
      } else {
        context.login(result.data.login);
        router.push("/");
      }
    });
  }

  return (
    <>
      <Head>
        <title>TAA - Login</title>
        <meta name="login" content="login page of The aesthete’s arena" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="flex justify-between p-4 ">
        <Link href="/">
          <a className="text-lg text-text">
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
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
          </a>
        </Link>
        <h1 className="text-lg text-text font-bold">The aesthete’s arena</h1>
      </nav>

      <form
        onSubmit={onSubmit}
        className={"bg-grey-lighter min-h-screen flex flex-col"}
      >
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-text px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Login</h1>
            <input
              type="text"
              className="block outline-none border border-grey-light w-full p-3 rounded mb-4"
              name="username"
              placeholder="Username"
              value={values.username}
              onChange={onChange}
            />

            <input
              type="password"
              className="block border outline-none border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={onChange}
            />

            <button
              type="submit"
              className="w-full bg-back text-text text-center py-3 rounded focus:outline-none my-1"
            >
              Login
            </button>
          </div>
          <div className="text-text mt-6">
            Don&apos;t have an account?
            <Link href="../register">
              <a className="no-underline border-b border-blue text-blue">
                register
              </a>
            </Link>
          </div>

          {Object.keys(errors).length > 0 && (
            <ul>
              {Object.values(errors).map((value) => (
                <li className="text-red-600" key={value}>
                  *{value}
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </>
  );
}
