import ReactMarkdown from "react-markdown"
import { EditorState } from "../Editor/Editor"

interface MarkDownPreviewProps {
  data: EditorState
}

const MarkDownPreview = ({ data }: MarkDownPreviewProps) => {
  return (
    <div
      id="mark-down"
      className="flex flex-row text-white w-full h-full bg-slate-500 rounded-md shadow-md"
    >
      <div className="p-4 w-1/2 overflow-y-scroll">
        <h2 className="text-lg font-bold">Body</h2>
        <ReactMarkdown className="mt-1 h-full break-words">
          {data.body}
        </ReactMarkdown>
      </div>
      <div className="w-1/2 bg-green-400 p-4 rounded-tr-md rounded-br-md overflow-y-scroll">
        <h2 className="text-lg font-bold">Meta Data</h2>
        <p className="mt-1">count: {data.param_count}</p>
        <pre>params: {JSON.stringify(data.params, null, 2)}</pre>
      </div>
    </div>
  )
}
export default MarkDownPreview
