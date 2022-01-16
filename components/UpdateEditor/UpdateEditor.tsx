import { ChangeEvent, createRef, Dispatch, SetStateAction, useRef } from "react"
import { marked } from "marked"
import { Variables, Template } from "../../pages"

interface EditorProps {
  state: Template
  setData: Dispatch<SetStateAction<Template>>
  setPreviewData: Dispatch<SetStateAction<Template>>
  regex: RegExp
}
const UpdateEditor = ({
  state,
  setData,
  regex,
  setPreviewData,
}: EditorProps) => {
  const inputRef = createRef<HTMLInputElement>()
  const handleEditorChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const currentData = e.target.value
    const parsedData = [...currentData.matchAll(regex)]
    const params = parsedData.map((data): Variables => {
      if (data.index !== undefined && data.input !== undefined) {
        const length = data.at(0)?.length ?? -1
        const offset = data.index

        const name = data.at(1) ?? ""
        return { offset, length, name }
      } else {
        return { offset: -1, length: -1, name: "" }
      }
    })

    setData((prevState) => ({
      ...prevState,
      params,
      body: currentData,
      param_count: parsedData.length,
      subject: inputRef?.current?.value ?? "",
    }))
    setPreviewData((prevState) => ({
      ...prevState,
      params,
      body: currentData,
      param_count: parsedData.length,
      subject: inputRef?.current?.value ?? "",
    }))
  }

  const handleSave = () => {
    alert("template saved")
  }

  return (
    <div className="flex flex-col p-4 w-1/3 bg-white rounded-md shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-medium text-black">Compose Email</h1>
        <button
          onClick={handleSave}
          className="bg-blue-700 text-white px-5 py-1 rounded-md"
        >
          Save
        </button>
      </div>

      <textarea
        name="editor"
        className="bg-sky-100 flex-grow w-full resize-none border-0 focus-visible:outline-none p-5 rounded-md shadow-md"
        value={state.body}
        onChange={handleEditorChange}
      />
    </div>
  )
}
export default UpdateEditor
