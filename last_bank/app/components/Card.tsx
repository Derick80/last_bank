import { useNavigate } from '@remix-run/react'
import { format } from 'date-fns'
import React from 'react'
import { numberWithCommas } from '~/utils/format'
import { Bills } from '~/utils/types.server'
type Props = {
    bill: Bills
}
export default function Card ({ bill }: Props) {
    const navigate = useNavigate()

    return (
        <div className='flex flex-row w-full justify-between p-3'>
            <div className='flex flex-col place-items-start'>
                { ' ' }
                <div>{ bill.source }</div>
                <div>Due { format(new Date(bill.due_date), 'MMMM, do') }</div>
            </div>
            <div className='flex flex-row items-center justify-center '>${ numberWithCommas(bill.amount) }
                <div className='flex self-center' onClick={ () => navigate(`bill/${bill.id}`) }>
                    <span className='material-symbols-outlined'>chevron_right</span>
                </div></div>
        </div>
    )
}
