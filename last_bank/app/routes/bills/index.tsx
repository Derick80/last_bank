import { LoaderFunction, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import BillsCard from "archive/bills-card";
import GlobalCard from "archive/test-card";
import { requireUserId } from "~/utils/auth.server";
import { getUserBill } from "~/utils/bill.server";
export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const { userBills } = await getUserBill(userId);
  return json({ userBills, userId });
};

export default function Index() {
  const { userId, userBills } = useLoaderData();
  console.log("userId: ", userId, "userBills: ", userBills);

  return (
    <div className="h-full w-full row-span-1 row-start-1 col-span-1 md:col-start-3 md:col-end-12">
      index bills index route
      <GlobalCard data={userBills} isBill={true} />
      <Outlet />
    </div>
  );
}
