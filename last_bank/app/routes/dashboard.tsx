import { json, LoaderFunction } from '@remix-run/node'
import {
    Link,
    NavLink,
    Outlet,
    useLoaderData,
    useNavigate
} from '@remix-run/react'
import { formatISO } from 'date-fns'
import React from 'react'
import Button from '~/components/Button'
import { CardList } from '~/components/CardList'
import Layout from '~/components/layout'
import UserPanel from '~/components/user-panel'
import UserProfile from '~/components/user-panel'
import { getUser, requireUserId } from '~/utils/auth.server'
import { numberWithCommas } from '~/utils/format'
import { Ibills2 } from '~/utils/types.server'
import {
    getAllUserData,
    getUserBill,
    getUserIncome,
    getUserProfile
} from '~/utils/users.server'

export const loader: LoaderFunction = async ({ request }) => {
    const { userId } = await requireUserId(request)
    const { data } = await getAllUserData(userId)
    const { userBills } = await getUserBill(userId)
    const { userIncomes } = await getUserIncome(userId)
    return json({ userId, userBills, userIncomes, data })
}

export default function DashboardRoute () {
    const navigate = useNavigate()

    const { userId, userIncomes, data, userBills } = useLoaderData()
    console.log('dash', userId)
    //this works
    console.log('userBills', userBills)
    const totalBills: number = userBills.reduce(
        (acc: number, curr: any) => (acc += curr.amount),
        0
    )
    console.log('totalBills', totalBills)
    const totalIncomes: number = userIncomes.reduce(
        (acc: number, curr: any) => (acc += curr.amount),
        0
    )
    console.log('totalIncomes', totalIncomes)
    return (
        <>

            <div className='h-full w-full row-span-1 row-start-1 col-span-1 md:col-start-3 md:col-end-6'>
                <div className='transactions-outlet'>
                    <Link to='/bills/new' className='button'>
                        Add your own
                    </Link>

                    <Outlet />
                </div>
                <div className='transactions-outlet'>
                    <Link to='/bills' className='button'>
                        see all bills
                    </Link>

                    <Outlet />
                </div>
                <h3>Bills</h3>
                <p className='underline underline-offset-8 text-lg md:text-3xl'>
                    ${ numberWithCommas(totalBills) }
                </p>
                {/* this is correct */ }
                <CardList
                    items={ userBills }
                    as='div'
                    renderItem={ (bill: Ibills2) => (
                        <div
                            className='flex flex-col items-center text-center  w-full md:max-w-screen-xl rounded overflow-hidden shadow-lg m-2'
                            key={ bill.id }
                        >
                            <NavLink
                                className={ ({ isActive }) =>
                                    `block border-b p-4 text-xl ${isActive ? 'bg-white' : ''}`
                                }
                                to={ bill.id }
                            >
                                <div className='flex flex-row w-full justify-between'>
                                    <div className='flex flex-col'>
                                        <p className='underline'>Source </p>
                                        <p>{ bill.source }</p>
                                    </div>
                                    <div className='flex flex-col'>
                                        <p className='underline'>Due Date </p>
                                        <p>
                                            { formatISO(new Date(bill.due_date), {
                                                representation: 'date'
                                            }) }
                                        </p>
                                    </div>
                                    <div className='flex flex-col'>
                                        <p className='underline'>Amount Due</p>

                                        <p>${ numberWithCommas(bill.amount) }</p>
                                    </div>
                                </div>
                                <div className='flex flex-row w-full justify-between'>
                                    <div className='flex flex-col'>
                                        { ' ' }
                                        <p className='underline'>Description:</p>
                                        <p>{ bill.description }</p>
                                    </div>
                                    <div className='flex flex-col'>
                                        { ' ' }
                                        <p className='underline'>Recurring:</p>
                                        <p className='uppercase'>{ String(bill.recurring) }</p>
                                    </div>
                                    <div className='flex flex-col'>
                                        { ' ' }
                                        <p className='underline'>Paid?:</p>
                                        <p className='uppercase'>{ String(bill.paid) }</p>
                                    </div>
                                </div>
                                <div>
                                    { ' ' }
                                    <Button onClick={ () => navigate(`bills/${bill.id}`) }>
                                        Edit
                                    </Button>
                                </div>
                            </NavLink>
                        </div>
                    ) }
                />
                <div className='flex-1 p-6'>
                    <Outlet />
                </div>
            </div>
            <div className='h-full w-full col-span-1 md:col-start-7 md:col-end-11'>
                <div className='new-outlet'>
                    <Link to='new' className='button'>
                        Add your own
                    </Link>

                    <Outlet />
                </div>
                <h3>Icome</h3>
                <p className='underline underline-offset-8 text-lg md:text-3xl'>
                    ${ numberWithCommas(totalIncomes) }
                </p>
                {/* this is correct */ }
                <CardList
                    items={ userIncomes }
                    as='div'
                    renderItem={ (income: any) => (
                        <div
                            className='flex flex-col items-center text-center  w-full md:max-w-screen-xl rounded overflow-hidden shadow-lg m-2'
                            key={ income.id }
                        >
                            <div className='flex flex-row w-full justify-between'>
                                <div className='flex flex-col'>
                                    <p className='underline'>Source </p>
                                    <p>{ income.source }</p>
                                </div>
                                <div className='flex flex-col'>
                                    <p className='underline'>Due Date </p>
                                    <p>
                                        { formatISO(new Date(income.payment_date), {
                                            representation: 'date'
                                        }) }
                                    </p>
                                </div>
                                <div className='flex flex-col'>
                                    <p className='underline'>Amount Due</p>

                                    <p>${ numberWithCommas(income.amount) }</p>
                                </div>
                            </div>
                            <div className='flex flex-row w-full justify-between'>
                                <div className='flex flex-col'>
                                    { ' ' }
                                    <p className='underline'>Description:</p>
                                    <p>{ income.description }</p>
                                </div>
                                <div className='flex flex-col'></div>
                                <div className='flex flex-col'>
                                    { ' ' }
                                    <p className='underline'>Received?</p>
                                    <p className='uppercase'>{ String(income.received) }</p>
                                </div>
                            </div>
                        </div>
                    ) }
                />
            </div>
        </>
    )
}
