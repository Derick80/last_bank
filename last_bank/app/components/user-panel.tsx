import React from 'react'
import { Profile, User } from '@prisma/client'
import UserProfile from './user-profile'
import SvgAccount from '../../dist_icons/Account.js'
import SvgBank from '../../dist_icons/Bank.js'
import SvgMoneyoff from '../../dist_icons/MoneyOff.js'
import SvgSettings from '../../dist_icons/Settings.js'
import SvgMoney from '../../dist_icons/Money.js'
import SvgShowchart from '../../dist_icons/ShowChart.js'
import { Link } from '@remix-run/react'
import comment from '../../public/comment.png'

export default function UserPanel () {
    return (
        <div className="h-full w-full shadow col-span-1 row-span-1 row-start-3 row-end-3 md:col-start-1 md:col-end-3 md:row-start-1 md:row-end-3 md:shadow-md">
            <>
            </>

            <Link to='/'>
                <span className="material-symbols-outlined">
                    account_balance
                </span>
            </Link>

            <Link to='' >
                <span className="material-symbols-outlined">
                    show_chart
                </span>
            </Link>

            <Link to='/bills/new'>
                <span className="material-symbols-outlined">
                    money_off
                </span>

            </Link>
            <Link to='/bills/new'>
                <span className="material-symbols-outlined">
                    attach_money
                </span>

            </Link>

            <Link to='/bills/new'>
                <span className="material-symbols-outlined">
                    pie_chart
                </span>

            </Link>
            <Link to='/bills/new'>
                <span className="material-symbols-outlined">
                    person
                </span>

            </Link>
        </div >
    )
}
