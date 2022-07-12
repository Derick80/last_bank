import { LoaderFunction, json } from '@remix-run/node'
import { numberWithCommas } from '~/utils/format'

import { useNavigate } from '@remix-run/react'
import { format, formatISO } from 'date-fns'
import { Income } from '@prisma/client'




type Props = {
    userIncomes: Income[]
}

export default function IncomesCard ({ userIncomes }: Props) {
    const navigate = useNavigate()
    return (<>
        {
            userIncomes.map((income) => (
                <div
                    className='flex flex-col items-center text-center text-base w-full md:max-w-screen-xl rounded overflow-hidden shadow-lg m-2 py-2 md:text-lg'
                    key={ income.id }
                    onClick={ () => navigate(`income/${income.id}`) }
                >
                    <div className='flex flex-row w-full justify-between'>
                        <div className='flex flex-col'>
                            <p className='underline'>Source </p>
                            <p>{ income.source }</p>
                        </div>
                        <div className='flex flex-col'>
                            <p className='underline'>Due Date </p>
                            <p>
                                { format(new Date(income.payment_date), 'MM/dd/yyyy') }
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
                        <div className='flex flex-col justify-items-center'>
                            { income.received === true ? <p className=''>Received<span className="material-symbols-outlined">
                                check_box
                            </span></p> : <p className=''>Received<span className="material-symbols-outlined">
                                question_mark
                            </span></p> }
                        </div>

                    </div>
                </div>
            ))
        }</>)
}