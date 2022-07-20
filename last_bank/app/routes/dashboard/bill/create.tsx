import type { ActionFunction, LoaderFunction } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"
import { Form, useActionData, useLoaderData } from "@remix-run/react"
import React, { useState } from "react"
import FormField from "~/components/shared/form-field"
import { Modal } from "~/components/modal"
import ToggleButton from "archive/ToggleButton"
import { getUserId, requireUserId } from "~/utils/auth.server"
import { createBill } from "~/utils/bill.server"
import {
  validateAmount,
  validateBoolean,
  validateText,
} from "~/utils/validators.server"

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  if (!userId) {
    throw new Response("Unauthorized", { status: 401 })
  }
  return json({ userId })
}

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request)
  const formData = await request.formData()
  const source = formData.get("source")
  const description = formData.get("description")
  let amount = Number(formData.get("amount"))
  let accountNumber = Number(formData.get("accountNumber"))
  // @ts-ignore
  let due_date = new Date(formData.get("due_date"))

  let recurring = Boolean(formData.get("recurring"))

  let paid = Boolean(formData.get("paid"))

  if (
    typeof source !== "string" ||
    typeof description !== "string" ||
    typeof amount !== "number"
  ) {
    return json({ error: "invalid form data", form: action }, { status: 400 })
  }

  const errors = {
    source: validateText(source as string),
    accountNumber: validateAmount(accountNumber as number),

    description: validateText(description as string),
    amount: validateAmount(amount as number),
    recurring: validateBoolean(recurring as boolean),
    paid: validateBoolean(paid as boolean),
  }

  if (Object.values(errors).some(Boolean))
    return json(
      {
        errors,
        fields: { source, description, amount, recurring, paid, due_date },
        form: action,
      },
      { status: 400 }
    )
  const bill = await createBill({
    source,
    amount,
    accountNumber,
    due_date,
    recurring,
    paid,

    description,
    userId,
  })

  return redirect("/dashboard")
}

export default function Create () {
  const actionData = useActionData()
  const { userId } = useLoaderData()

  const [formError, setFormError] = useState(actionData?.error || "")
  const [errors, setErrors] = useState(actionData?.errors || {})

  const [formData, setFormData] = useState({
    source: "",
    description: "",
    amount: null,
    accountNumber: null,
    due_date: "",
    recurring: false,
    userId: userId,
    paid: false,
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
    <Modal isOpen={ true } className="w-2/3 p-10 flex flex-col">
      <Form method="post" className="md:text-xl font-semibold">
        <FormField
          htmlFor="source"
          label="Source"
          value={ formData.source }
          onChange={ (event: any) => handleInputChange(event, "source") }
          error={ errors?.source }
        />
        <FormField
          htmlFor="description"
          label="description"
          value={ formData.description }
          onChange={ (event: any) => handleInputChange(event, "description") }
          error={ errors?.description }
        />
        <FormField
          htmlFor="amount"
          label="amount"
          type="number"
          value={ formData.amount }
          onChange={ (event: any) => handleInputChange(event, "amount") }
          error={ errors?.amount }
        />
        <FormField
          htmlFor="accountNumber"
          label="accountNumber"
          type="number"
          value={ formData.accountNumber }
          onChange={ (event: any) => handleInputChange(event, "accountNumber") }
          error={ errors?.accountNumber }
        />
        <FormField
          htmlFor="due_date"
          label="due_date"
          type="date"
          value={ formData.due_date }
          onChange={ (event: any) => handleInputChange(event, "due_date") }
          error={ errors?.due_date }
        />
        <FormField
          htmlFor="recurring"
          label="Recurring"
          type="checkbox"
          name="recurring"
          checked={ formData.recurring }
          value={ formData.recurring }
          onChange={ (event: any) => triggerToggle(event, "recurring") }
          error={ errors?.recurring }
        />

        <FormField
          htmlFor="paid"
          label="Paid"
          type="checkbox"
          checked={ formData.paid }
          value={ formData.paid }
          onChange={ (event: any) => triggerToggle(event, "paid") }
          error={ errors?.paid }
        />

        <div className="w-full text-container">
          <button
            type="submit"
            className="rounded-xl bg-blue-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover: bg:light-orange-400"
          >
            Create a new Bill
          </button>
        </div>
      </Form>
    </Modal>
  )
}
