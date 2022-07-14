import { Income } from "@prisma/client";
import { json, LoaderFunction, redirect, Response } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Modal } from "~/components/modal";
import { getUserId } from "~/utils/auth.server";
import { getOneUserIncome } from "~/utils/income.server";

type LoaderData = {
  income: Income;
  isOwner: boolean;
};
export const loader: LoaderFunction = async ({ params, request }) => {
  // 2
  let userId = await getUserId(request);

  const { incomeId } = params;

  if (typeof incomeId !== "string") {
    return redirect("/dashboard");
  }

  let income = userId
    ? await getOneUserIncome({ id: params.incomeId, userId })
    : null;
  if (!income) {
    throw new Response("Income not found", { status: 404 });
  }
  let data: LoaderData = { income, isOwner: userId == income.userId };
  return json(data);
};
export default function $IncomeModal() {
  const data = useLoaderData();
  return (
    <Modal isOpen={true} className="w-2/3 p-10">
      <h2>
        {" "}
        User: {data.income.source} {data.income.description}{" "}
      </h2>
    </Modal>
  );
}
