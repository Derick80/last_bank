import type { Bill } from "@prisma/client"
import type { ActionFunction, LoaderFunction } from "@remix-run/node"
import { json, redirect, Response } from "@remix-run/node"
import { useActionData, useLoaderData } from "@remix-run/react"
import { useState } from "react"
import FormField from "~/components/shared/form-field"
import { Modal } from "~/components/modal"
import { getUser, getUserId, requireUserId } from "~/utils/auth.server"
import { getOneUserBIll, updateOneUserBill } from "~/utils/bill.server"

import {
  validateText,
  validateAmount,
  validateBoolean,
} from "~/utils/validators.server"
import { format } from 'date-fns'

type LoaderData = {
  bill: Bill
  isOwner: boolean
}
export const loader: LoaderFunction = async ({ params, request }) => {
  // 2
  let userId = await getUserId(request)
  const user = await getUser(request)

  const billId = params.billId as string

  if (typeof billId !== "string") {
    return redirect("/")
  }

  let bill = userId ? await getOneUserBIll({ id: billId, userId }) : null
  if (!bill) {
    throw new Response("Bill not found", { status: 404 })
  }
  let data: LoaderData = { bill, isOwner: userId == bill.userId }
  return json({ data, user })
}

export const action: ActionFunction = async ({ request, params }) => {
  const billId = params.billId as string
  const userId = await requireUserId(request)
  let formData = await request.formData()
  const id = formData.get("id")
  let source = formData.get("source")
  let accountNumber = Number(formData.get("accountNumber"))
  let amount = Number(formData.get("amount"))
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
    amount: validateAmount(amount as number),
    accountNumber: validateAmount(accountNumber as number),
    recurring: validateBoolean(recurring as boolean),
    paid: validateBoolean(paid as boolean),
    description: validateText(description as string),

  }

  if (Object.values(errors).some(Boolean))
    return json(
      {
        errors,
        fields: {
          source,
          accountNumber,
          amount,
          due_date,

          description,
        },
        form: action,
      },
      { status: 400 }
    )

  await updateOneUserBill({
    id: id,
    userId: userId,
    source,
    accountNumber,
    amount,
    recurring,
    due_date,
    paid,
    description,
  })
  return redirect("/dashboard")
}
export default function BillModal () {
  const { data, user } = useLoaderData()
  const actionData = useActionData()
  const [errors, setErrors] = useState(actionData?.errors || {})
  console.log(actionData)

  const [formData, setFormData] = useState({
    id: data.bill.id,
    source: data.bill.source,
    accountNumber: data.bill.accountNumber,
    amount: data.bill.amount,
    due_date: data.bill.due_date,
    recurring: data.bill.recurring,
    paid: data.bill.paid,
    description: data.bill.description,
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
          htmlFor="accountNumber"
          label="Account Number"
          name="accountNumber"
          type="number"
          value={ formData.accountNumber }
          onChange={ (event: any) => handleInputChange(event, "accountNumber") }
          error={ errors?.accountNumber }
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
          value={ format(new Date(formData.due_date), 'yyyy-MM-dd') }
          onChange={ (event: any) => handleInputChange(event, "due_date") }
          error={ errors?.due_date }
        />

        <FormField
          htmlFor="recurring"
          label="Recurring"
          type="checkbox"
          name='recurring'
          checked={ formData.recurring }
          value={ formData.recurring }
          onChange={ (event: any) => triggerToggle(event, "recurring") }
          error={ errors?.recurring }
        />

        <FormField
          htmlFor='paid'
          label="Paid"
          type="checkbox"
          checked={ formData.paid }
          value={ formData.paid }

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

        <div className="w-full text-container">
          <button type="submit">Save</button>
        </div>
      </form>
    </Modal>
  )
}
