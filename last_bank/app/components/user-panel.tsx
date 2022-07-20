import type { Profile } from "@prisma/client"
import { Link, useNavigate } from "@remix-run/react"
import Tooltip from "./shared/ToolTip"

export default function UserPanel ({ profile }: { profile: Profile }) {
  const navigate = useNavigate()

  return (
    <div className="h-full w-full shadow col-span-1 row-span-1 row-start-3 row-end-3 md:col-start-1 md:col-end-3 md:row-auto md:shadow-xl md:opacity-70 md:p-4">
      <div className="flex flex-col items-center py-4 space-y-10">
        <div className="flex flex-col items-center py-4">
          <Tooltip message="DashBoard Home">
            <Link to="/">
              <span className="material-symbols-outlined">home</span>
            </Link>
          </Tooltip>

          <Link to="">
            <span className="material-symbols-outlined">show_chart</span>
          </Link>

          <Tooltip message="All Bills">
            <Link to="/bills">
              <span className="material-symbols-outlined">money_off</span>
            </Link>
          </Tooltip>
          <Tooltip message="All Incomes">
            <Link to="/incomes">
              <span className="material-symbols-outlined">attach_money</span>
            </Link>
          </Tooltip>
          <Link to="/bills/new">
            <span className="material-symbols-outlined">pie_chart</span>
          </Link>
        </div>

        <Tooltip message="Profile">
          <div onClick={ () => navigate(`profile`) }>
            <span className="material-symbols-outlined">person</span>
          </div>
        </Tooltip>
        <Tooltip message="Logout">
          <form action="/logout" method="post">
            <button
              type="submit"
              className="rounded-xl bg-yellow-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
            >
              <span className="material-symbols-outlined">logout</span>
              Sign Out
            </button>
          </form>
        </Tooltip>
      </div>
    </div>
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
