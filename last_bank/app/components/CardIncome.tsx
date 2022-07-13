import { Income } from '@prisma/client'
import { useNavigate } from '@remix-run/react'
import { format } from 'date-fns'
import { useState } from 'react'
import { numberWithCommas } from '~/utils/format'
import Tooltip from './ToolTip'
type Props = {
    income: Income
}
export default function CardIncome ({ income }: Props) {
    const navigate = useNavigate()
    const [expand, setExpand] = useState(false)
    let ttMessage = !expand ? 'Expand to See More' : 'Collapse'
    return (
        <div className='flex flex-row static w-full justify-between p-3'>
            <div className='flex flex-col place-items-start'>
                { ' ' }
                <div>{ income.source }</div>
                <div>Due { format(new Date(income.payment_date), 'MMMM, do') }</div>
            </div>
            <div className="font-['Eczar'] text-base flex flex-row items-center justify-center">${ numberWithCommas(income.amount) }
                <Tooltip message='Edit Income'>
                    <div className='flex self-center' onClick={ () => navigate(`income/${income.id}`) }>
                        <span className='material-symbols-outlined'>chevron_right</span>
                    </div>
                </Tooltip>

            </div>


            <div className='text-center absolute bottom-0 left-1/2' onClick={ () => setExpand(!expand) }>
                <Tooltip message={ ttMessage }>
                    { expand ? <span className="material-symbols-outlined">
                        expand_less
                    </span> : <span className="material-symbols-outlined">
                        expand_more
                    </span> }
                </Tooltip>
            </div>


            { expand === true ? (
                <>
                    <div className='flex flex-col place-items-start'>
                        { ' ' }
                        <div>{ income.received }</div>
                        <div>{ income.description }</div>
                    </div>
                </>
            ) : null }
        </div>
    )
}
