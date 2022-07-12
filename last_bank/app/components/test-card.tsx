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
    let four = userBills.slice(0, 4)
    console.log(four)
    if (show === false) {
        return <>
            { four.map((bill) => (
                <div
                    className='flex flex-col items-center text-center text-base w-full bg-zinc-700 md:max-w-screen-xl rounded overflow-hidden shadow-2xl transition duration-500 ease-in-out delay-150 transform hover:-translate-y-1 hover:scale-110 m-2 py-2 md:text-lg'
                    key={ bill.id }
                >
                    <Card bill={ bill } />
                </div>
            )) }
            <div><button onClick={ () => setShow(!show) }>{ show ? 'show less' : 'show more' }</button></div>
        </>
    } else {
        return (
            <>
                <div><button onClick={ () => setShow(!show) }>{ show ? 'show less' : 'show more' }</button></div>
                { userBills.map((bill) => (
                    <div
                        className='flex flex-col items-center text-center text-base w-full bg-zinc-700 md:max-w-screen-xl rounded overflow-hidden shadow-2xl transition duration-500 ease-in-out delay-150 transform hover:-translate-y-1 hover:scale-110 m-2 py-2 md:text-lg'
                        key={ bill.id }
                    >
                        <Card bill={ bill } />
                    </div>
                )) }
                <div><button onClick={ () => setShow(!show) }>{ show ? 'show less' : 'show more' }</button></div>
            </>
        )
    }
}