import { ChangeEvent, Dispatch, SetStateAction } from "react"

export interface Param {
  position: [number, number]
  name: string
}
export interface EditorState {
  param_count: number
  body: string
  params: Param[]
}

interface EditorProps {
  state: EditorState
  setData: Dispatch<SetStateAction<EditorState>>
  regex: RegExp
}
const Editor = ({ state, setData, regex }: EditorProps) => {
  const handleEditorChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const currentData = e.target.value
    // Fix new line issue on carriage return
    const data = currentData.replaceAll(/\n/gm, "  \n")
    const parsedData = [...currentData.matchAll(regex)]
    console.log(parsedData)

    const params = parsedData.map((data): Param => {
      if (data.index !== undefined && data.input !== undefined) {
        const finalPosition = data.index + data[0]?.length - 1
        const position: [number, number] = [data.index, finalPosition]
        console.log(data.at(1))

        const name = data.at(1) ?? ""
        return { position, name }
      } else {
        return { position: [-1, -1], name: "" }
      }
    })

    setData((prevState) => ({
      ...prevState,
      params,
      body: data,
      param_count: parsedData.length,
    }))
  }

  return (
    <div className="flex flex-col p-4 w-1/3 bg-white rounded-md shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-medium text-black">Compose Email</h1>
        <button className="bg-blue-700 text-white px-5 py-1 rounded-md">
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
export default Editor
