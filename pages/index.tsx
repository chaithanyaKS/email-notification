import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { useState } from "react"
import Editor, { EditorState } from "../components/Editor/Editor"
import Preview from "../components/MarkDownPreview/MarkDownPreview"
import MetaDataPreview from "../components/MetaDataPreview/MetaDataPreview"

const Home: NextPage = () => {
  const DEFAULT_REGEX = /\$\{{(\S*?)}}/g
  const [editorData, setEditorData] = useState<EditorState>({
    body: "",
    param_count: 0,
    params: [],
  })

  return (
    <div className="flex flex-col h-full min-w-screen bg-blue-50">
      <h1 className="text-4xl font-semibold text-center">Email Notification</h1>
      <div className="gap-4 p-8 flex flex-grow">
        <Editor
          state={editorData}
          setData={setEditorData}
          regex={DEFAULT_REGEX}
        />
        <div id="preview" className="w-1/3 bg flex flex-col gap-8 rounded-md ">
          <Preview data={editorData} />
        </div>
        <div id="preview" className="w-1/3 bg flex flex-col gap-8 rounded-md ">
          <MetaDataPreview
            count={editorData.param_count}
            params={editorData.params}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
