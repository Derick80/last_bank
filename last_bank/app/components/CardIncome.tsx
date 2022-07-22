import type { Income, Bill } from "@prisma/client"
import { useNavigate } from "@remix-run/react"
import { format } from "date-fns"
import { useState } from "react"
import { numberWithCommas } from "~/utils/format"
import { IBill, IIncome } from "~/utils/types.server"
import Tooltip from "./shared/ToolTip"
type Props = {
  item: IIncome | IBill
  isBill: boolean
  isAll?: boolean
}
export default function CardIncome ({ item, isBill, isAll }: Props) {

  const navigate = useNavigate()
  const [expand, setExpand] = useState(false)
  let ttMessage = !expand ? "Expand to See More" : "Collapse"

  // let tag = item.tags.map((tag) => {
  //   return tag
  // })
  // console.log(tag)

  return (
    <div className="flex flex-col static w-full justify-between p-3">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col place-items-start">
          <div className="uppercase">{ item.source }</div>
          <div>Due { format(new Date(item.due_date), "MMMM, do") }</div>
        </div>
        <div className="font-['Eczar'] text-base flex flex-row items-center md:text-xl">
          ${ numberWithCommas(item.amount) }
          <Tooltip message="Edit item">
            <div
              className="items-center p-2"
              onClick={ () =>
                isBill
                  ? navigate(`/bills/${item.id}`)
                  : navigate(`incomes/${item.id}`)
              }
            >
              <span className="material-symbols-outlined">edit</span>
            </div>
          </Tooltip>
        </div>
      </div>

      { expand === true ? (
        <>
          <div className="flex justify-between items-center">
            <div>
              { item.recurring === true ? (
                <div className="flex flex-row justify-center">
                  Recurring
                  <span className="material-symbols-outlined">check_box</span>
                </div>
              ) : (
                <div className="flex flex-row justify-center">
                  Recurring{ " " }
                  <span className="material-symbols-outlined">
                    check_box_outline_blank
                  </span>{ " " }
                </div>
              ) }
            </div>
            { item.tags &&
              item.tags.map((tag) => (
                <div
                  key={ tag.id }
                  className="rounded-md bg-red-400 p-1 uppercase font-bold"
                >
                  { tag.tagName }
                </div>
              )) }
            <div>
              { item.paid === true ? (
                <div className="flex flex-row justify-center">
                  paid
                  <span className="material-symbols-outlined">check_box</span>
                </div>
              ) : (
                <div className="flex flex-row justify-between">
                  paid{ " " }
                  <span className="material-symbols-outlined">
                    check_box_outline_blank
                  </span>{ " " }
                </div>
              ) }
            </div>
          </div>

          <div className="items-center"> { item.description }</div>
        </>
      ) : (
        <div className="flex justify-center">
          { item.tags &&
            item.tags.map((tag) => (
              <div
                key={ tag.id }
                className="rounded-md bg-red-400 p-1 uppercase w-1/4 justify-center font-bold"
              >
                { tag.tagName }
              </div>
            )) }
        </div>
      ) }

      <div
        className="text-center absolute bottom-0 w-1/2"
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
    </div>
  )
}
