import type { Income } from "@prisma/client"
import type { ActionFunction, LoaderFunction } from "@remix-run/node"
import { json, redirect, Response } from "@remix-run/node"
import { useActionData, useLoaderData } from "@remix-run/react"
import { useState } from "react"
import FormField from "~/components/shared/form-field"
import { Modal } from "~/components/modal"
import { getUser, getUserId, requireUserId } from "~/utils/auth.server"
import { getOneUserIncome, updateOneUserIncome } from "~/utils/income.server"
import {
  validateText,
  validateAmount,
  validateBoolean,
} from "~/utils/validators.server"
import { format } from "date-fns"

type LoaderData = {
  income: Income
  isOwner: boolean
}
export const loader: LoaderFunction = async ({ params, request }) => {
  // 2
  let userId = await getUserId(request)
  const user = await getUser(request)

  const incomeId = params.incomeId as string

  if (typeof incomeId !== "string") {
    return redirect("/")
  }

  let income = userId ? await getOneUserIncome({ id: incomeId, userId }) : null
  if (!income) {
    throw new Response("Income not found", { status: 404 })
  }
  let data: LoaderData = { income, isOwner: userId == income.userId }
  return json({ data, user })
}

export const action: ActionFunction = async ({ request, params }) => {
  const incomeId = params.listId as string

  const userId = await requireUserId(request)
  let formData = await request.formData()
  const id = formData.get("id")
  let source = formData.get("source")
  let amount = Number(formData.get("amount"))
  let accountNumber = Number(formData.get("accountNumber"))
  // @ts-ignore
  let due_date = new Date(formData.get("due_date"))
  let recurring = Boolean(formData.getAll("recurring"))
  let paid = Boolean(formData.getAll("paid"))
  let description = formData.get("description")

  if (
    typeof id !== "string" ||
    typeof source !== "string" ||
    typeof description !== "string" ||
    typeof userId !== "string"
  ) {
    return json({ error: "invalid form data" }, { status: 400 })
  }
  const errors = {
    source: validateText(source as string),
    description: validateText(description as string),
    amount: validateAmount(amount as number),
    accountNumber: validateAmount(accountNumber as number),

    paid: validateBoolean(paid as boolean),
  }

  if (Object.values(errors).some(Boolean))
    return json(
      {
        errors,
        fields: { source, accountNumber, amount, due_date, paid, description },
        form: action,
      },
      { status: 400 }
    )

  await updateOneUserIncome({
    id: id,
    userId: userId,
    source,
    accountNumber,
    amount,
    due_date,
    recurring,
    paid,
    description,
  })
  return redirect("/dashboard")
}
export default function IncomeModal () {
  const { data, user } = useLoaderData()
  const actionData = useActionData()
  const [errors, setErrors] = useState(actionData?.errors || {})
  const [formData, setFormData] = useState({
    id: data.income.id,
    source: data.income.source,
    accountNumber: data.income.accountNumber,
    recurring: data.income.recurring,
    amount: data.income.amount,
    due_date: data.income.due_date,
    paid: data.income.required,
    description: data.income.description,
  })

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLFormElement>,
    field: string
  ) => {
    setFormData((form) => ({
      ...form,
      [field]: event.target.value,
    }))
  }

  const triggerToggle = (
    event: React.ChangeEvent<HTMLInputElement | HTMLFormElement>,
    field: string
  ) => {
    setFormData((form) => ({
      ...form,
      [field]: event.target.checked,
    }))
  }
  return (
    <Modal isOpen={ true } className="w-2/3 p-10">
      <form method="post" className="text-xl font-semibold">
        <FormField
          htmlFor="id"
          label=""
          name="id"
          type="hidden"
          value={ formData.id }
          onChange={ (event: any) => handleInputChange(event, "id") }
          error={ errors?.id }
        />

        <FormField
          htmlFor="source"
          label="Source"
          name="source"
          value={ formData.source }
          onChange={ (event: any) => handleInputChange(event, "source") }
          error={ errors?.source }
        />

        <FormField
          htmlFor="amount"
          label="Amount"
          name="amount"
          type="number"
          value={ formData.amount }
          onChange={ (event: any) => handleInputChange(event, "amount") }
          error={ errors?.amount }
        />

        <FormField
          htmlFor="due_date"
          label="Due Date"
          type="date"
          name="due_date"
          value={ format(new Date(formData.due_date), "yyyy-MM-dd") }
          onChange={ (event: any) => handleInputChange(event, "due_date") }
          error={ errors?.due_date }
        />
        <FormField
          htmlFor="recurring"
          label="recurring"
          type="checkbox"
          value={ formData.recurring }
          checked={ formData.recurring }
          onChange={ (event: any) => triggerToggle(event, "recurring") }
          error={ errors?.recurring }
        />
        <FormField
          htmlFor="paid"
          label="paid"
          type="checkbox"
          value={ formData.paid }
          checked={ formData.paid }
          onChange={ (event: any) => triggerToggle(event, "paid") }
          error={ errors?.paid }
        />

        <FormField
          htmlFor="description"
          label="Description"
          name="description"
          value={ formData.description }
          onChange={ (event: any) => handleInputChange(event, "description") }
          error={ errors?.description }
        />
        <div className="self-center">
          <button
            type="submit"
            className="rounded-xl bg-blue-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover: bg:light-orange-400"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  )
}
