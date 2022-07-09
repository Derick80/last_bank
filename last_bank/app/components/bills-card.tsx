import { LoaderFunction, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { formatISO } from 'date-fns'
import React from 'react'
import { requireUserId } from '~/utils/auth.server'
import { numberWithCommas } from '~/utils/format'
import { Ibills2 } from '~/utils/types.server'
import { getUserBill } from '~/utils/users.server'
import { CardList } from './CardList'
export const loader: LoaderFunction = async ({ request }) => {
    const { userId } = await requireUserId(request)

    const { userBills } = await getUserBill(userId)

    return json({ userBills, userId })
}

export default function BillsCard () {
    const { userBills, userId } = useLoaderData()
    return (
        <>{/* this is correct */ }
            <CardList items={ userBills } as='div'
                renderItem={ (bill: Ibills2) => (
                    <div className='flex flex-col items-center text-center  w-full md:max-w-screen-xl rounded overflow-hidden shadow-lg m-2' key={ bill.id }>
                        <div className='flex flex-row w-full justify-between'>
                            <div className='flex flex-col'>
                                <p className='underline'>Source </p>
                                <p>{ bill.source }</p>
                            </div>
                            <div className='flex flex-col'>
                                <p className='underline'>Due Date </p>
                                <p>{ formatISO(new Date(bill.due_date), { representation: 'date' }) }</p>

                            </div>
                            <div className='flex flex-col'>
                                <p className='underline'>Amount Due</p>

                                <p>${ numberWithCommas(bill.amount) }</p></div>
                        </div>
                        <div className="flex flex-row w-full justify-between">
                            <div className='flex flex-col'> <p className='underline'>Description:</p>
                                <p>{ bill.description }</p></div>
                            <div className='flex flex-col'> <p className='underline'>Recurring:</p>
                                <p className='uppercase'>{ String(bill.recurring) }</p></div>
                            <div className='flex flex-col'> <p className='underline'>Paid?:</p>
                                <p className='uppercase'>{ String(bill.paid) }</p></div>
                        </div>
                    </div>
                ) } /></>
    )
}
