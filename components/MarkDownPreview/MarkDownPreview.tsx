import ReactMarkdown from "react-markdown"
import { EditorState } from "../Editor/Editor"

interface MarkDownPreviewProps {
  data: EditorState
}
const t = '<p class="text-red-400>test</p>'
const Preview = ({ data }: MarkDownPreviewProps) => {
  return (
    <>
      <div className="p-4 bg-white rounded-md flex-grow shadow-md overscroll-x-scroll">
        <h2 className="text-2xl font-bold">Body</h2>
        <hr className="my-2 border-t-[3px] rounded-full" />
        <ReactMarkdown className="break-words">{data.body}</ReactMarkdown>
      </div>
    </>
  )
}
export default Preview
