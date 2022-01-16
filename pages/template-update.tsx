import Link from "next/link"
import { useState } from "react"
import { Template } from "."
import DynamicInputs from "../components/DynamicInputs/DynamicInputs"
import Editor from "../components/Editor/Editor"
import Preview from "../components/MarkDownPreview/MarkDownPreview"
import MetaDataPreview from "../components/MetaDataPreview/MetaDataPreview"
import UpdateEditor from "../components/UpdateEditor/UpdateEditor"

const TemplateUpdate = () => {
  const DEFAULT_REGEX = /\$\{{(\S*?)}}/g
  const [template, setTemplateData] = useState<Template>({
    body: `Dear \${{username}},
Your process with the id \${{process_id}} is complete. Click on the \${{website}} and log into your account to get the overall details.
\${{username}}
Thank you,
Regards,
\${{team}}`,
    param_count: 0,
    params: [
      {
        name: "username",
        offset: 5,
        length: 13,
      },
      {
        name: "process_id",
        offset: 45,
        length: 15,
      },
      {
        name: "website",
        offset: 87,
        length: 12,
      },
      {
        name: "team",
        offset: 175,
        length: 9,
      },
      {
        name: "team",
        offset: 175,
        length: 9,
      },
    ],
    subject: "",
  })

  const [previewData, setPreviewData] = useState(template)

  return (
    <div className="flex flex-col h-full min-w-screen pt-6 bg-blue-100">
      <h1 className="text-4xl font-semibold capitalize text-center">
        email template update process
      </h1>
      <div className="px-8 mt-5">
        <span className="mr-8 hover:underline">
          <Link href="/">Link to Add Template</Link>
        </span>
        <span className="mr-8 hover:underline">
          <Link href="/wiki">Link to Template wiki</Link>
        </span>
      </div>
      <div className="gap-4 px-8 my-4 flex flex-grow">
        <UpdateEditor
          state={template}
          setData={setTemplateData}
          regex={DEFAULT_REGEX}
          setPreviewData={setPreviewData}
        />
        <div id="preview" className="w-1/3 bg flex flex-col gap-8 rounded-md ">
          <Preview data={previewData} />
        </div>
        <div id="preview" className="w-1/3 bg flex flex-col gap-8 rounded-md ">
          <DynamicInputs
            templateData={template}
            setTemplateData={setPreviewData}
          />
        </div>
      </div>
    </div>
  )
}
export default TemplateUpdate
