import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <>
      <Head>
        <title>About</title>
        <meta name="about" content="about The aesthete’s arena" />
        <link
          rel="icon"
          href="https://i.ibb.co/6ns5q9k/apollo-god-of-sun-symbol-logo-trademark-antelope-wildlife-transparent-png-1515689-removebg-preview.png"
        />
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

      {/* <img src="https://toppng.com/uploads/preview/apollo-head-11552730006n3ckukfriy.png" /> */}
      <section className="hero container max-w-screen-lg mx-auto p-10 flex justify-center">
        <Image
          src="https://www.greekmythology.com/images/mythology/apollo_large_image_8.jpg"
          width={300}
          height={300}
          alt="apollo"
          //   className="mx-auto"
        />
      </section>
      <p className="ml-4 italic text-text-secondary ">
        &quot;Apollo is the god of music, poetry, art, oracles, archery, plague,
        medicine, sun, light, and, knowledge.&quot;
      </p>

      <div className="p-10">
        <p className="text-text font-bold text-lg">
          The aesthete’s arena is a community to portray writing,visual
          art,internet culture research and beyond.
        </p>
      </div>
    </>
  );
}
