import { LoaderFunction, json } from '@remix-run/node'
import { NavLink, useLoaderData } from '@remix-run/react'
import { formatISO } from 'date-fns'
import { numberWithCommas } from '~/utils/format'
import { Bills, Ibills2 } from '~/utils/types.server'
import Button from './Button'
import { useNavigate } from '@remix-run/react'


type Props = {
    userBills: Bills[]
}
export default function BillsCard ({ userBills }: Props) {
    const navigate = useNavigate()

    return (
        <>{/* this is correct */ }
            { userBills.map((bill) => (
                <div
                    className='flex flex-col items-center text-center text-base w-full md:max-w-screen-xl rounded overflow-hidden shadow-2xl m-2 py-2 md:text-lg'
                    key={ bill.id }
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
                        <Button onClick={ () => navigate(`/bills/${bill.id}`) }>
                            Edit
                        </Button>
                    </div>

                </div>
            )) }
        </>
    )
}
