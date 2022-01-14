import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { useState } from "react"
import Editor, { EditorState } from "../components/Editor/Editor"
import MarkDownPreview from "../components/MarkDownPreview/MarkDownPreview"

const Home: NextPage = () => {
  const DEFAULT_REGEX = /\$\{{(\S*?)}}/g
  const [editorData, setEditorData] = useState<EditorState>({
    body: "",
    param_count: 0,
    params: [],
  })

  return (
    <div className="min-h-screen min-w-screen bg-stone-100">
      <h1 className="text-4xl font-semibold text-center">Email Notification</h1>
      <div className="min-h-screen h-full gap-4 p-8 flex">
        <Editor
          state={editorData}
          setData={setEditorData}
          regex={DEFAULT_REGEX}
        />
        <div
          id="preview"
          className="w-1/2 h-[60vh] bg flex flex-col gap-8 rounded-md "
        >
          <MarkDownPreview data={editorData} />
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default Home
