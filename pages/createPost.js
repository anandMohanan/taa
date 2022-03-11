import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from "react";
import dynamic from "next/dynamic";
import { convertToRaw, EditorState, RichUtils } from "draft-js";
import Link from "next/link";
import { useMutation } from "urql";
import { useRouter } from "next/router";
import FileBase from "react-file-base64";
import { CREATE_POST } from "../graphql/mutations";
import Head from "next/head";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  { ssr: false }
);

export default function CreatePost() {
  const [result, setCreatePost] = useMutation(CREATE_POST);
  const router = useRouter();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    if (editorState.getCurrentContent().hasText()) {
      setPost({ ...post, body: a });
    } else {
      setErrors({ error: "body should not be empty" });
    }
  };
  const [errors, setErrors] = useState({});

  const [post, setPost] = useState({
    title: "",
    body: "",
    image: "",
  });

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onEditorStateChange(newState);
    }
  };
  let a = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

  const onSubmit = (e) => {
    e.preventDefault();
    setCreatePost(post).then((result) => {
      if (result.error) {
        setErrors(result.error.graphQLErrors[0].extensions.errors);
        // console.log(result.error);
      } else {
        console.log(result);
        router.push("/");
        // router.reload(window.location.pathname);
      }
    });
    console.log("POST", post);
  };

  return (
    <>
      <Head>
        <title>Create</title>
        <meta name="create" content="create posts" />
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
      </nav>
      <div className="mb-3 pt-0 flex object-center items-center">
        <input
          type="text"
          placeholder="TITLE"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          className="p-3 box-border outline-none  placeholder-blueGray-300 text-text font-bold relative text-sm   focus:ring w-full"
        />
      </div>

      <div className="mb-3 pt-0 flex object-center items-center text-text">
        <FileBase
          type="file"
          placeholder="Upload a image"
          value={post.image}
          multiple={false}
          onDone={({ base64 }) => setPost({ ...post, image: base64 })}
          className="p-3 box-border outline-none  placeholder-blueGray-300 text-text font-bold relative text-sm   focus:ring w-full"
        />
      </div>
      <div className="">
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto "
          editorClassName="p-4 bg-white shadow-lg max-w-5xl mx-auto  mb-12 border bg-text "
        />

        <button
          onClick={onSubmit}
          type="submit"
          className=" w-full text-text font-bold mb-3"
        >
          Submit
        </button>
        <br />
        {Object.keys(errors).length > 0 && (
          <ul>
            {Object.values(errors).map((value) => (
              <li className="text-red-500" key={value}>
                *{value}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
