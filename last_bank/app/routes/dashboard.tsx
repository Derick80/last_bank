import { LoaderFunction, json } from '@remix-run/node'
import { requireUserId } from '~/utils/auth.server'
import { useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant';
import { formatDistance, formatISO } from 'date-fns'

import { getAllUserData, getNewData, getUserBill } from '~/utils/users.server'
import Layout from '~/components/layout'
import { data, allUserData } from '~/utils/types.server'
import { numberWithCommas } from '~/utils/format';
import { useEffect, useState } from 'react';



export const loader: LoaderFunction = async ({ request }) => {
    const { userId, email } = await requireUserId(request)
    const { data } = await getAllUserData(userId, email)
    const { userBills } = await getUserBill(userId, email)

    return json({ data, userBills })
}
interface IBills {
    id: string
    source: string
    due_date: Date
    description: string
    amount: number
    paid: boolean
    recurring: boolean
}
export default function Dashboard () {
    const [totalsBills, setTotalsBills] = useState(0)
    const { data, userBills } = useLoaderData()
    console.log(Array.isArray(data));




    useEffect(() => {
        function useAmounts (userBills: any) {
            const total: number = userBills.reduce((acc: number, curr: any) => acc + curr.amount, 0)
            setTotalsBills(total)
        }

    }, [totalsBills])

    //this works
    console.log("userBills", userBills);
    const totalBills: number = userBills.reduce((acc: number, curr: any) => (acc += curr.amount), 0)
    console.log("totalBills", totalBills);


    return (
        <Layout>
            <>
                <div className='h-full w-full col-span-1 md:col-start-2 md:col-end-6'>
                    <h3>Bills</h3>
                    <p className='underline underline-offset-8 text-lg md:text-3xl'>${ numberWithCommas(totalsBills) }</p>
                    {/* this is correct */ }
                    { data.bills.map((item: any) => (
                        <div className='flex flex-col items-center text-center  w-full md:max-w-screen-xl rounded overflow-hidden shadow-lg' key={ item.id }>
                            <div className='flex flex-row w-full justify-between'>
                                <div className='flex flex-col'>
                                    <p className='underline'>Source </p>
                                    <p>{ item.source }</p>
                                </div>
                                <div className='flex flex-col'>
                                    <p className='underline'>Due Date </p>
                                    <p>{ formatISO(new Date(item.due_date), { representation: 'date' }) }</p>

                                </div>
                                <div className='flex flex-col'>
                                    <p className='underline'>Amount Due</p>

                                    <p>${ numberWithCommas(item.amount) }</p></div>
                            </div>
                            <div className="flex flex-row w-full justify-between">
                                <div className='flex flex-col'> <p className='underline'>Description:</p>
                                    <p>{ item.description }</p></div>
                                <div className='flex flex-col'> <p className='underline'>Recurring:</p>
                                    <p className='uppercase'>{ String(item.recurring) }</p></div>
                                <div className='flex flex-col'> <p className='underline'>Paid?:</p>
                                    <p className='uppercase'>{ String(item.paid) }</p></div>
                            </div>

                        </div>
                    )) }
                </div>
            </>

        </Layout>
    )
}

type CardListItemProps = {
    bill: {
        id: string
        source: string
        due_date: Date
        description: string
        amount: number
        paid: boolean
        recurring: boolean
    }
}
