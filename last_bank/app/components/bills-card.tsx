import { useNavigate } from '@remix-run/react'
import { format, formatISO } from 'date-fns'
import { useState } from 'react'
import { numberWithCommas } from '~/utils/format'
import { Bills } from '~/utils/types.server'
import Card from './Card'

type Props = {
    userBills: Bills[]

}
export default function BillsCard ({ userBills }: Props) {
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    const dataForDisplay = show ? userBills : userBills.slice(0, 4)


    return (
        <>
            <div><button onClick={ () => setShow(!show) }>{ show ? 'show less' : 'show more' }</button></div>
            { dataForDisplay.map((bill) => (
                <div
                    className='flex flex-col items-center text-center text-base w-full dark:bg-zinc-700 md:max-w-screen-xl rounded overflow-hidden shadow-2xl transition duration-500 ease-in-out delay-150 transform hover:-translate-y-1 hover:scale-110 mb-2 mt-2 p-2 md:text-lg'
                    key={ bill.id }
                >
                    <Card bill={ bill } />
                </div>
            )) }

        </>
    )
}
