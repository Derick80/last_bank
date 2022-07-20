import type { Income, Bill } from "@prisma/client"
import { useNavigate } from "@remix-run/react"
import { format } from "date-fns"
import { useState } from "react"
import { numberWithCommas } from "~/utils/format"
import Tooltip from "./ToolTip"
type Props = {
  item: Income | Bill
  isBill: boolean
}
export default function CardIncome ({ item, isBill }: Props) {
  const navigate = useNavigate()
  const [expand, setExpand] = useState(false)
  let ttMessage = !expand ? "Expand to See More" : "Collapse"
  return (
    <div className="flex flex-row static w-full justify-between p-3">
      <div className="flex flex-col place-items-start">
        <div>{ item.source }</div>
        <div>Due { format(new Date(item.due_date), "MMMM, do") }</div>
      </div>
      <div className="font-['Eczar'] text-base flex flex-row items-center md:text-xl">
        ${ numberWithCommas(item.amount) }
        <Tooltip message="Edit item">
          <div
            className="items-center p-2"
            onClick={ () => isBill ? navigate(`bill/${item.id}`) : navigate(`income/${item.id}`) }
          >
            <span className="material-symbols-outlined">edit</span>
          </div>
        </Tooltip>
      </div>

      <div
        className="text-center absolute bottom-0 left-1/2"
        onClick={ () => setExpand(!expand) }
      >
        <Tooltip message={ ttMessage }>
          { expand ? (
            <span className="material-symbols-outlined">expand_less</span>
          ) : (
            <span className="material-symbols-outlined">expand_more</span>
          ) }
        </Tooltip>
      </div>

      { expand === true ? (
        <>
          <div className="flex flex-col place-items-start">
            { " " }
            <div>{ item.paid }</div>
            <div>{ item.description }</div>
          </div>
        </>
      ) : null }
    </div>
  )
}
