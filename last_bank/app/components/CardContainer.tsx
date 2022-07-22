import type { Bill, Income } from "@prisma/client"
import { Link, Outlet, useNavigate } from "@remix-run/react"
import { vi } from "date-fns/locale"
import React, { useState } from "react"
import { numberWithCommas } from "~/utils/format"
import { sumTotals } from "~/utils/functions.server"
import CardBody from "../../archive/bills-card"
import BillsCard from "../../archive/bills-card"
import Card from "../../archive/Card"
import CardHeader from "./CardHeader"
import GlobalCard from "../../archive/test-card"
import { IBill, IIncome } from "~/utils/types.server"
import CardIncome from './CardIncome'

type ICardHeader = {
  bill?: IBill[]
  income?: IIncome[]
  isBill: boolean
  monthlyTotals: number
  isAll?: boolean
}
export default function CardContainer ({
  bill,
  income,
  isBill,
  monthlyTotals,
  isAll,
}: ICardHeader) {
  const navigate = useNavigate()

  const newRouteLink = isBill ? "bill" : "income"
  const viewAllLink = isBill ? "bills" : "incomes"
  const totalMonthly = monthlyTotals

  return (
    <>
      { bill && (
        <CardHeader
          userData={ bill }
          isBill={ true }
          totalMonthly={ totalMonthly }
        />
      ) }<>
        { income && (
          <CardHeader
            userData={ income }
            isBill={ false }
            totalMonthly={ totalMonthly }
          />
        ) }</>
    </>
  )

}

// if (isAll === true) {
//   return (
//     <div className="h-full w-full row-span-1 row-start-1 col-span-1 md:col-start-3 md:col-end-11 md:row-auto">
//       {
//         bill ? (
//           <>
//             { bill.map((item) => (
//               <div
//                 className="flex flex-col items-center text-center text-base w-full dark:bg-zinc-700 md:max-w-screen-xl rounded overflow-hidden shadow-2xl transition duration-500 ease-in-out delay-150 transform hover:-translate-y-1 hover:scale-110 mb-2 mt-2 py-2 md:text-lg"
//                 key={ item.id }
//               >
//                 <CardIncome item={ item } isBill={ isBill } />
//               </div>)) }
//           </>) : income && (
//             <>
//               { income.map((item) => (
//                 <div
//                   className="flex flex-col items-center text-center text-base w-full dark:bg-zinc-700 md:max-w-screen-xl rounded overflow-hidden shadow-2xl transition duration-500 ease-in-out delay-150 transform hover:-translate-y-1 hover:scale-110 mb-2 mt-2 py-2 md:text-lg"
//                   key={ item.id }
//                 >
//                   <CardIncome item={ item } isBill={ isBill } />
//                 </div>)) }
//             </>
//           ) }
//     </div>
//   )


// }