import type { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import Editor from "../components/Editor/Editor"
import Preview from "../components/MarkDownPreview/MarkDownPreview"
import MetaDataPreview from "../components/MetaDataPreview/MetaDataPreview"

export interface Variables {
  offset: number
  length: number
  name: string
}
export interface Template {
  id?: string
  subject: string
  param_count: number
  body: string
  params: Variables[]
}

const Home: NextPage = () => {
  const DEFAULT_REGEX = /\$\{{(\S*?)}}/g
  const router = useRouter()
  const [template, setEditorData] = useState<Template>({
    body: "",
    param_count: 0,
    params: [],
    subject: "",
  })

  let previewBody = template.body
  previewBody = previewBody.replaceAll("${{", "_${{")
  previewBody = previewBody.replaceAll("}}", "}}_")

  const [previewData, setPreviewData] = useState({
    ...template,
    body: previewBody,
  })

  return (
    <div className="flex flex-col h-full min-w-screen pt-6 bg-blue-100">
      <h1 className="text-4xl font-semibold text-center">
        Email Template Add Process
      </h1>
      <div className="px-8 mt-5">
        <span className="mr-8 hover:underline">
          <Link href="/template-update">Link to Update Template</Link>
        </span>
        <span className="mr-8 hover:underline">
          <Link href="/wiki">Link to Template wiki</Link>
        </span>
      </div>
      <div className="gap-4 my-4 px-8 flex flex-grow">
        <Editor
          state={template}
          setData={setEditorData}
          regex={DEFAULT_REGEX}
          setPreviewData={setPreviewData}
        />
        <div id="preview" className="w-1/3 bg flex flex-col gap-8 rounded-md ">
          <Preview data={previewData} />
        </div>
        <div id="preview" className="w-1/3 bg flex flex-col gap-8 rounded-md ">
          <MetaDataPreview
            count={template.param_count}
            params={template.params}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
