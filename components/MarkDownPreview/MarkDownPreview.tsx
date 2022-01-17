import ReactMarkdown from "react-markdown"
import Markdown from "marked-react"
import { Template } from "../../pages"

interface MarkDownPreviewProps {
  data: Template
}
const t = '<p class="text-red-400>test</p>'
const Preview = ({ data }: MarkDownPreviewProps) => {
  return (
    <>
      <div className="p-4 bg-white rounded-md flex-grow shadow-md overscroll-x-scroll">
        <h2 className="text-2xl font-bold">Body</h2>
        <hr className="my-2 border-t-[3px] rounded-full" />
        <div className="prose prose-em:bg-purple-700 prose-em:text-white prose-em:rounded-sm prose-em:px-1 prose-em:py-[0.125em]">
          <Markdown breaks gfm>
            {data.body}
          </Markdown>
        </div>
      </div>
    </>
  )
}
export default Preview
