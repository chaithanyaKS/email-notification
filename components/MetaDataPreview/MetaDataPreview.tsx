import { Variables } from "../../pages"

interface MetaDataPreviewProps {
  count: number
  params: Variables[]
}
const MetaDataPreview = ({ count, params }: MetaDataPreviewProps) => {
  return (
    <div className="bg-white flex-grow p-4 rounded-md shadow-md">
      <h2 className="text-2xl font-bold">Meta Data</h2>
      <hr className="my-2 border-t-[3px]" />
      <div className="p-1 bg-sky-100 rounded-md capitalize ">
        <p className="mt-1">count: {count}</p>
      </div>
      <div className="mt-2 p-1 h-[84%] bg-sky-100 rounded-md">
        <span className="capitalize">params:</span>
        {/* {JSON.stringify(params, null, 2)} */}
        <div className="flex gap-2 flex-wrap">
          {params.map((param, id) => (
            <div
              key={id}
              className="bg-sky-700 inline-block px-3 py-1 rounded-md text-white"
            >
              <p>
                <span className="capitalize">name:</span> {param.name}
              </p>
              <p>
                <span className="capitalize">Offset: </span> {param.offset}
              </p>
              <p>
                <span className="capitalize">Length: </span> {param.length}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MetaDataPreview
