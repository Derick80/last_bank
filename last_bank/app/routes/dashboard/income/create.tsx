import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import FormField from "~/components/shared/form-field";
import { Modal } from "~/components/modal";
import ToggleButton from "archive/ToggleButton";
import { getUserId, requireUserId } from "~/utils/auth.server";
import { createIncome } from "~/utils/income.server";
import {
  validateText,
  validateAmount,
  validateBoolean,
} from "~/utils/validators.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  const incomeId = params.listId as string;
  const userId = await getUserId(request);
  if (!userId) {
    throw new Response("Unauthorized", { status: 401 });
  }
  return json({ userId });
};

type ActionData = {
  formError?: string;
  fieldErrors?: {
    source: string | undefined;
    accountNumber: number | undefined;
    amount: number | undefined;
    due_date: Date | undefined;
    recurring: boolean | undefined;
    paid: boolean | null;
    description: string | undefined;
  };
  fields?: {
    source: string;
    accountNumber: number;
    amount: number;
    due_date: Date;
    recurring: boolean;
    paid: boolean;
    description: string;
  };
};
export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  let formData = await request.formData();
  let source = formData.get("source");
  let amount = Number(formData.get("amount"));
  let accountNumber = formData.get("accountNumber");
  // @ts-ignore
  let due_date = new Date(formData.get("due_date"));
  let recurring = Boolean(formData.get("recurring"));
  let paid = Boolean(formData.get("paid"));
  let description = formData.get("description");

  if (
    typeof source !== "string" ||
    typeof description !== "string" ||
    typeof userId !== "string"
  ) {
    return json({ error: "invalid form data" }, { status: 400 });
  }
  const errors = {
    source: validateText(source as string),
    amount: validateAmount(amount as number),
    accountNumber: validateAmount(accountNumber as number),
    recurring: validateBoolean(recurring as boolean),
    paid: validateBoolean(paid as boolean),
    description: validateText(description as string),
  };

  if (Object.values(errors).some(Boolean))
    return json(
      {
        errors,
        fields: {
          source,
          amount,
          accountNumber,
          due_date,
          recurring,
          paid,
          description,
        },
        form: action,
      },
      { status: 400 }
    );
  const income = await createIncome({
    source,
    accountNumber,
    amount,
    due_date,
    recurring,
    paid,
    description,
    userId: userId,
  });
  return redirect("/dashboard");
};

export default function Create() {
  const userId = useLoaderData();
  const actionData = useActionData();

  const [formError, setFormError] = useState(actionData?.error || "");
  const [errors, setErrors] = useState(actionData?.errors || {});

  const [formData, setFormData] = useState({
    source: "",
    accountNumber: null,
    amount: null,
    due_date: "",
    recurring: true,
    paid: false,
    description: "",
    userId: userId,
  });
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLFormElement>,
    field: string
  ) => {
    setFormData((form) => ({
      ...form,
      [field]: event.target.value,
    }));
  };

  const triggerToggle = (
    event: React.ChangeEvent<HTMLInputElement | HTMLFormElement>,
    field: string
  ) => {
    setFormData((form) => ({
      ...form,
      [field]: event.target.checked,
    }));
  };
  return (
    <Modal isOpen={true} className="w-2/3 p-10 flex flex-col">
      <form method="post" className="md:text-xl font-semibold">
        <FormField
          htmlFor="source"
          label="Source"
          name="source"
          value={formData.source}
          onChange={(event: any) => handleInputChange(event, "source")}
          error={errors?.source}
        />

        <FormField
          htmlFor="accountNumber"
          label="Account Number"
          name="accountNumber"
          type="number"
          value={formData.accountNumber}
          onChange={(event: any) => handleInputChange(event, "accountNumber")}
          error={errors?.accountNumber}
        />
        <FormField
          htmlFor="amount"
          label="Amount"
          name="amount"
          type="number"
          value={formData.amount}
          onChange={(event: any) => handleInputChange(event, "amount")}
          error={errors?.amount}
        />
        <FormField
          htmlFor="due_date"
          label="Payment Date"
          type="date"
          name="due_date"
          onChange={(event: any) => handleInputChange(event, "due_date")}
          error={errors?.due_date}
        />

        <FormField
          className=" p-2 rounded-xl my-2"
          htmlFor="recurring"
          label="Recurring"
          type="checkbox"
          value={formData.recurring}
          onChange={(event: any) => triggerToggle(event, "recurring")}
          error={errors?.recurring}
        />
        <FormField
          className=" p-2 rounded-xl my-2"
          htmlFor="paid"
          label="Paid"
          type="checkbox"
          value={formData.paid}
          onChange={(event: any) => triggerToggle(event, "paid")}
          error={errors?.paid}
        />
        <FormField
          htmlFor="description"
          label="Description"
          name="description"
          value={formData.description}
          onChange={(event: any) => handleInputChange(event, "description")}
          error={errors?.description}
        />
      </form>
      <div className="w-full text-container">
        <button
          type="submit"
          className="rounded-xl bg-blue-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover: bg:light-orange-400"
        >
          Create
        </button>
      </div>
    </Modal>
  );
}
