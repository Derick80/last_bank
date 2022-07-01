import { formatISO } from 'date-fns'


export default function IncomeItems ({ item }: any) {
    return (<ul>
        <li>
            { item.source }
        </li>
        <li>{ item.description }</li>
        <li>{ item.amount }</li>
        <li>{ formatISO(new Date(item.payment_date), { representation: 'date' }) }</li>
        <li>{ item.received }</li>

    </ul>)
}