import { Income, Bill } from "@prisma/client"
import { Link, useNavigate } from "@remix-run/react"
import { useState } from "react"
import { numberWithCommas } from "~/utils/format"
import type { IBill, IIncome } from "~/utils/types.server"
import CardIncome from "./CardIncome"

type Props = {
  userData: IIncome[] | IBill[]
  isBill: boolean
  totalMonthly: number
  isAll?: boolean
}
export default function CardHeader ({ userData, isBill, totalMonthly }: Props) {
  const [isAll, setIsAll] = useState(false)
  const [show, setShow] = useState(isAll === true ? true : false)
  const navigate = useNavigate()
  const dataForDisplay = show ? userData : userData.slice(0, 4)
  const newRouteLink = isBill ? "bills" : "incomes"
  const viewAllLink = isBill ? "bills" : "incomes"

  const handleAll = () => {
    navigate(`${viewAllLink}`)
    setIsAll(isAll)
  }
  return (
    <>


      <div onClick={ handleAll } className="button">
        { isBill ? `View all ${viewAllLink} by Month` : `View all ${viewAllLink} by Month` }
      </div>


      <div onClick={ () => navigate(`/${newRouteLink}/create`) }>
        <span className="material-symbols-outlined">add</span>
      </div>

      <p className="font-Eczar font-normal text-3xl underline decoration-red-700 underline-offset-8  md:text-5xl">
        ${ numberWithCommas(totalMonthly) }
      </p>
      <div>
        <button onClick={ () => setShow(!show) }>
          { show ? "show less" : "Show All of this Month" }
        </button>
      </div>
      { dataForDisplay.map((item) => (
        <div
          className="flex flex-col items-center text-center text-base w-full dark:bg-zinc-700 md:max-w-screen-xl rounded overflow-hidden shadow-2xl transition duration-500 ease-in-out delay-150 transform hover:-translate-y-1 hover:scale-110 mb-2 mt-2 py-2 md:text-lg"
          key={ item.id }
        >
          <CardIncome item={ item } isBill={ isBill } />
        </div>
      )) }
    </>
  )
}
