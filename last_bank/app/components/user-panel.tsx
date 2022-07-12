import type { Profile } from '@prisma/client'
import { Link, useNavigate } from '@remix-run/react'

export default function UserPanel ({ profile }: { profile: Profile }) {
    const navigate = useNavigate()

    return (
        <div className="h-full w-full shadow col-span-1 row-span-1 row-start-3 row-end-3 md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-3 md:shadow-md">

            <div className="flex flex-col items-center py-4">

                <div className="flex flex-col items-center py-4">
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

                    <Link to='/bills'>
                        <span className="material-symbols-outlined">
                            money_off
                        </span>

                    </Link>
                    <Link to='/incomes'>
                        <span className="material-symbols-outlined">
                            attach_money
                        </span>

                    </Link>

                    <Link to='/bills/new'>
                        <span className="material-symbols-outlined">
                            pie_chart
                        </span>

                    </Link>
                </div>
                <div onClick={ () => navigate(`profile`) }>
                    <span className="material-symbols-outlined">
                        person
                    </span>

                </div>
                <form action="/logout" method="post">
                    <button type="submit" className="rounded-xl bg-yellow-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"><span className="material-symbols-outlined">
                        logout
                    </span>
                        Sign Out
                    </button>
                </form>
            </div>


        </div >
    )
}


// {
//     data.user ? (
//         <div className="user-info">
//             <span>{ `Hi ${data.user.username}` }</span>
//             <form action="/logout" method="post">
//                 <button type="submit" className="button">
//                     Logout
//                 </button>
//             </form>
//         </div>
//     ) : (
//     <Link to="/login">Login</Link>
// )
// }