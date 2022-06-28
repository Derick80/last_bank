import { LoaderFunction, json } from '@remix-run/node'
import { requireUserId } from '~/utils/auth.server'
import { Link, Outlet, useLoaderData, useLocation, useParams, useResolvedPath } from '@remix-run/react'
import { formatISO } from 'date-fns'

import { getAllUserData, getUserBill, getUserIncome } from '~/utils/users.server'
import Layout from '~/components/layout'
import { numberWithCommas } from '~/utils/format';
import { CardList } from '~/components/CardList';
import type { LinkProps } from "react-router-dom";
import { useState } from 'react'
import Button from '~/components/Button'
import { Ibills2 } from '~/utils/types.server'
import { useNavigate } from '@remix-run/react'
export const loader: LoaderFunction = async ({ request }) => {
    const { userId, email } = await requireUserId(request)
    const { data } = await getAllUserData(userId, email)
    const { userBills } = await getUserBill(userId, email)
    const { userIncomes } = await getUserIncome(userId, email)
    return json({ data, userBills, userIncomes, userId })
}
interface IBills {
    children?: React.ReactNode
    id: string
    source: string
    due_date: Date
    description: string
    amount: number
    paid: boolean
    recurring: boolean
}


export default function Dashboard () {
    const { data, userBills, userIncomes, userId } = useLoaderData()
    console.log(Array.isArray(data));

    console.log(userId);
    const navigate = useNavigate()
    let location = useLocation();
    console.log(location);
    const [billAction, setBillAction] = useState('bills')
    const [incomeAction, setIncomeAction] = useState('incomes')
    const [buttonTitle, setButtonTitle] = useState('bills')



    //this works
    console.log("userBills", userBills);
    const totalBills: number = userBills.reduce((acc: number, curr: any) => (acc += curr.amount), 0)
    console.log("totalBills", totalBills);
    const totalIncomes: number = userIncomes.reduce((acc: number, curr: any) => (acc += curr.amount), 0)
    console.log("totalIncomes", totalIncomes);

    function updateButton (title: string) {
        setButtonTitle(title)
    }
    const handleButtonClick = (title: string) => {


    }

    return (

        <>
            <div className='h-full w-full col-span-1 md:col-start-2 md:col-end-6'>
                <div className='flex flex-row items-center'>
                    <p className='underline underline-offset-8 text-lg md:text-3xl'>${ numberWithCommas(totalBills) }</p>
                    <Button onClick={ () => { setBillAction('bills') } } >
                        <Link to='new' >
                            Add A Bill
                        </Link>

                        <Outlet />

                    </Button>
                    <Button onClick={ () => navigate(`bill/${userId}`) } >All Bills</Button>

                </div>


                {/* this is correct */ }
                <CardList items={ userBills }
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
                    ) } />


            </div>
            <div className='h-full col-span-1 md:col-start-7 md:col-end-12'>
                <div className='flex flex-row items-center'>
                    <Button onClick={ () => navigate(`income/${userId}`) } >All Incomes</Button>
                    <h3>Icome</h3>
                    <p className='underline underline-offset-8 text-lg md:text-3xl'>${ numberWithCommas(totalIncomes) }</p>
                    <Link to='new' className='button'>
                        Add an Income
                    </Link>

                    <Outlet />

                </div>

                {/* this is correct */ }
                <CardList items={ userIncomes }
                    renderItem={ (income: any) => (
                        <div className='flex flex-col items-center text-center  w-full md:max-w-screen-xl rounded shadow-lg m-2' key={ income.id }>
                            <div className='flex flex-row w-full justify-between'>
                                <div className='flex flex-col'>
                                    <p className='underline'>Source </p>
                                    <p>{ income.source }</p>
                                </div>
                                <div className='flex flex-col'>
                                    <p className='underline'>Due Date </p>
                                    <p>{ formatISO(new Date(income.payment_date), { representation: 'date' }) }</p>

                                </div>
                                <div className='flex flex-col'>
                                    <p className='underline'>Amount Due</p>

                                    <p>${ numberWithCommas(income.amount) }</p></div>
                            </div>
                            <div className="flex flex-row w-full justify-between">
                                <div className='flex flex-col'> <p className='underline'>Description:</p>
                                    <p>{ income.description }</p></div>
                                <div className='flex flex-col'></div>
                                <div className='flex flex-col'> <p className='underline'>Received?</p>
                                    <p className='uppercase'>{ String(income.received) }</p></div>
                            </div>
                        </div>
                    ) } />


            </div>
        </>

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
