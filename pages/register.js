import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useMutation } from "urql";

import { AuthContext } from "../context/authentication";
import { formHooks } from "../util/hooks";
import { REGISTER_MUTATION } from "../graphql/mutations";
import Head from "next/head";

export default function Register() {
  const context = useContext(AuthContext);
  const router = useRouter();
  const [errors, setErrors] = useState({});

  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const { onChange, onSubmit, values } = formHooks(registerUser, initialState);

  const [result, addUser] = useMutation(REGISTER_MUTATION);

  function registerUser() {
    addUser(values).then((result) => {
      if (result.error) {
        setErrors(result.error.graphQLErrors[0].extensions.errors);
      } else {
        context.login(result.data.register);
        router.push("/");
      }
    });
  }

  // if (Cookies.get("jwtToken")) {
  if (context.user) {
    router.push("/");
    return <></>;
  } else {
    return (
      <>
        <Head>
          <title>TAA - Register</title>
          <meta
            name="register"
            content="register page of The aesthete’s arena"
          />
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
            <div className=" px-6 py-8 rounded shadow-md bg-text w-full">
              <h1 className="mb-8 text-3xl text-center text-black">Register</h1>
              <input
                type="text"
                className="block border outline-none border-text-secondary w-full p-3 rounded mb-4"
                name="username"
                placeholder="Username"
                value={values.username}
                onChange={onChange}
              />

              <input
                type="text"
                className="block border outline-none border-text-secondary w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={onChange}
              />

              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={onChange}
              />
              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={values.confirmPassword}
                onChange={onChange}
              />

              <button
                type="submit"
                onSubmit={onSubmit}
                className="w-full bg-back text-text text-center py-3 rounded focus:outline-none my-1"
              >
                Create Account
              </button>

              {/* <div className="text-center text-sm text-grey-dark mt-4">
                By signing up, you agree to the
                <a
                  className="no-underline border-b border-grey-dark text-grey-dark"
                  href="#"
                >
                  Terms of Service
                </a>{" "}
                and
                <a
                  className="no-underline border-b border-grey-dark text-grey-dark"
                  href="#"
                >
                  Privacy Policy
                </a>
              </div> */}
            </div>

            <div className="text-text mt-6">
              Already have an account?
              <Link href="../login">
                <a className="no-underline border-b border-blue text-blue">
                  Log in
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
}
