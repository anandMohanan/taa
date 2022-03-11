import { convertFromRaw, EditorState } from "draft-js";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "urql";
import { Loading } from "../../components/Loading";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  { ssr: false }
);
import { POST_BY_ID_QUERY } from "../../graphql/queries";

export default function SinglePost() {
  const router = useRouter();
  const postId = router.query.id;

  const [result] = useQuery({
    query: POST_BY_ID_QUERY,
    variables: {
      postId,
    },
  });

  const { data, fetching, error } = result;
  // console.log(data);
  if (fetching) return <Loading />;
  if (error) {
    alert(`Error ${error} - Please reload the page`);
  }
  console.log(data.getPost);
  const contentState = convertFromRaw(JSON.parse(data.getPost.body)) || "hi";
  const state = EditorState.createWithContent(contentState);
  let a = data.getPost.image ? (
    <>
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
      </nav>
      <h1 className="text-text text-3xl font-extrabold  p-10 m-auto h-auto text-center">
        {data.getPost.title}
      </h1>
      <section className="hero container max-w-screen-lg mx-auto p-10 flex justify-center">
        <Image
          src={data.getPost.image}
          width={300}
          height={300}
          alt="apollo"
          //   className="mx-auto"
        />
      </section>
      <div className="bg-text p-4 m-4 rounded-md">
        <Editor
          editorState={state}
          readOnly={true}
          toolbarClassName="!hidden"
        />
      </div>
    </>
  ) : (
    <>
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
      </nav>
      <h1 className="text-text text-3xl font-extrabold  p-10 m-auto h-auto text-center">
        {data.getPost.title}
      </h1>

      <div className="bg-text p-4 m-4 rounded-md">
        <Editor
          editorState={state}
          readOnly={true}
          toolbarClassName="!hidden"
        />
      </div>
    </>
  );
  return a;
}
