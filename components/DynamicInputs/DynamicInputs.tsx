import { log } from "console"
import {
  Dispatch,
  FormEvent,
  FormEventHandler,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react"
import { Template } from "../../pages"

interface DynamicInputsProps {
  templateData: Template
  setTemplateData: Dispatch<SetStateAction<Template>>
  setPreviewData: Dispatch<SetStateAction<Template>>
}
const DynamicInputs = ({
  templateData,
  setTemplateData,
  setPreviewData,
}: DynamicInputsProps) => {
  const [uniqueVars, setUniqueVars] = useState<string[]>([])
  const [updatedUniqueVars, setUpdatedUniqueVars] = useState<string[]>([])
  const [isDestructiveUpdate, setIsDestructiveUpdate] = useState(false)
  const currentParams = "username process_id website team".split(" ")

  useEffect(() => {
    const vars = templateData.params.map((param) => param.name)
    const setA = new Set(vars)
    const setB = new Set(currentParams)
    const resA = vars.filter((val) => !setB.has(val))
    const resB = currentParams.filter((val) => !setA.has(val))
    const res = [...resA, ...resB]

    const isDestructive = res.findIndex((val) => currentParams.includes(val))
    if (isDestructive !== -1) {
      setIsDestructiveUpdate(true)
    } else {
      setIsDestructiveUpdate(false)
    }
    setUniqueVars([...new Set(vars)])
    setUpdatedUniqueVars(res)
    console.log(isDestructiveUpdate)
  }, [templateData])

  const handleInputChange = (e: FormEvent<HTMLUListElement>) => {
    const target = e.target as HTMLInputElement
    const dynamicInputString = target.dataset.input
    const regex = new RegExp(`\\\${{${dynamicInputString}}}`, "g")
    let updatedValue = ""
    if (target.value === "") {
      updatedValue = templateData.body.replace(
        regex,
        `_\${{${dynamicInputString}}}_`
      )
    } else {
      updatedValue = templateData.body.replace(regex, `_${target.value}_`)
    }
    setTemplateData((prevState) => ({ ...prevState, body: updatedValue }))
  }
  return (
    <div className="bg-white flex-grow p-4 rounded-md shadow-md">
      <h2 className="text-2xl font-bold">Dynamic Input List</h2>
      <hr className="my-2 border-t-[3px]" />
      <div className="p-1 bg-sky-100 rounded-md capitalize ">
        <p className="mt-1 capitalize font-semibold">
          dynamic input count: {uniqueVars.length}
        </p>
        {isDestructiveUpdate ? (
          <p className="mt-1 capitalize text-red-600 font-semibold">
            updated dynamic fields count: {updatedUniqueVars.length}{" "}
          </p>
        ) : (
          <p className="mt-1 capitalize text-green-600 font-semibold">
            updated dynamic fields count: {updatedUniqueVars.length}{" "}
          </p>
        )}
      </div>
      <div className=" mt-2 p-1 bg-sky-100 rounded-md">
        <span className="capitalize block mb-3 font-semibold">
          Dynamic Inputs
        </span>
        <div className="flex flex-col gap-2 flex-wrap w-full">
          <ul className="flex-grow" onChange={handleInputChange}>
            {uniqueVars.map((val) => (
              <li key={val}>
                <label htmlFor={val} className="capitalize block">
                  {val}:
                </label>
                <input
                  id={val}
                  type="text"
                  placeholder={val}
                  className="w-full mb-2 px-3 py-2 rounded-md placeholder:capitalize"
                  data-input={val}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isDestructiveUpdate && (
        <div className=" mt-2 p-1 bg-sky-100 rounded-md">
          {/* Display only if the saved fields are removed */}
          <>
            <p className="font-semibold">Removed Dynamic Fields</p>
            <ul className="my-3 flex">
              {updatedUniqueVars.map((val) => (
                <li key={val} className="mr-2">
                  <span className="bg-red-500 text-gray-100 capitalize px-4 py-1 rounded-full">
                    {val}
                  </span>
                </li>
              ))}
            </ul>
          </>
        </div>
      )}
    </div>
  )
}

export default DynamicInputs
