import { json, LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { requireUserId } from '~/utils/auth.server'
import { getUserBill } from '~/utils/users.server'

export const loader: LoaderFunction = async ({ request }) => {
  const { userId, email } = await requireUserId(request)
  const userBills = await getUserBill(userId, email)
  return json(userBills)
}
