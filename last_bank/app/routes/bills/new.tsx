import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node"
import { Form, useActionData, useLoaderData } from '@remix-run/react';
import React, { useState } from 'react';
import FormField from '~/components/form-field';
import ToggleButton from '~/components/ToggleButton';
import { getUserId, requireUserId } from '~/utils/auth.server';
import { createBill } from '~/utils/bill.server';
import { validateAmount, validateBoolean, validateText } from '~/utils/validators.server';


interface Pick {
    paid: boolean
}
export const loader: LoaderFunction = async ({ request }) => {
    const userId = await getUserId(request);
    if (!userId) {
        throw new Response("Unauthorized", { status: 401 });
    }
    return json({ userId });

}

export const action: ActionFunction = async ({ request }) => {
    const userId = await requireUserId(request)
    const form = await request.formData();
    const source = form.get('source');
    const description = form.get('description');
    let amount = Number(form.get('amount'))
    // @ts-ignore
    let due_date = new Date(form.get("due_date"));


    let recurring = Boolean(form.get('recurring'));

    let paid = Boolean(form.get('paid'));


    if (

        typeof source !== 'string' ||
        typeof description !== 'string' ||
        typeof amount !== 'number'
    ) {
        return json({ error: 'invalid form data', form: action }, { status: 400 })
            ;
    }

    const errors = {
        source: validateText((source as string)),
        description: validateText((description as string)),
        amount: validateAmount((amount as number)),

        recurring: validateBoolean((recurring as boolean)),
        paid: validateBoolean((paid as boolean))

    };

    if (Object.values(errors).some(Boolean))
        return json(
            {
                errors,
                fields: { source, description, amount, recurring, paid, due_date },
                form: action
            },
            { status: 400 }
        );
    const bill = await createBill({
        source,
        description,
        amount,
        due_date,
        paid,
        recurring,
        userId
    });

    return redirect(`/bills/${bill.id}`);
};



export default function New () {
    const actionData = useActionData()
    const { userId } = useLoaderData()
    const [toggle, setToggle] = useState(false)

    const [formError, setFormError] = useState(actionData?.error || '')
    const [errors, setErrors] = useState(actionData?.errors || {})

    const [formData, setFormData] = useState({
        source: '',
        description: '',
        amount: 0,
        due_date: '',
        recurring: false,
        userId: userId,
        paid: false,


    });


    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLFormElement>,
        field: string

    ) => {

        setFormData((form) => ({
            ...form,
            [field]: event.target.value
        }));
    };

    const triggerToggle = (
        event: React.ChangeEvent<HTMLInputElement | HTMLFormElement>,
        field: string) => {

        setFormData((form) => ({
            ...form,
            [field]: event.target.checked
        }));
    }
    return (

        <div>
            <Form method='post' className='rounded-2xl'>

                <FormField
                    className='text-black'
                    htmlFor='source'
                    label='Source'
                    value={ formData.source }
                    onChange={ (event: any) => handleInputChange(event, 'source') }
                    error={ errors?.source } />
                <FormField
                    className='text-black'

                    htmlFor='description'
                    label='description'
                    value={ formData.description }
                    onChange={ (event: any) => handleInputChange(event, 'description') }
                    error={ errors?.description } />
                <FormField
                    className='text-black'

                    htmlFor='amount'
                    label='amount'
                    type='number'
                    value={ formData.amount }
                    onChange={ (event: any) => handleInputChange(event, 'amount') }
                    error={ errors?.amount } />


                <FormField
                    className='text-black'

                    htmlFor='due_date'
                    label='due_date'
                    type='date'
                    value={ formData.due_date }
                    onChange={ (event: any) => handleInputChange(event, 'due_date') }
                    error={ errors?.due_date } />
                <FormField
                    className='text-black'

                    htmlFor='recurring'
                    label='recurring'
                    type='checkbox'
                    value={ formData.recurring }
                    onChange={ (event: any) => triggerToggle(event, 'recurring') }
                    error={ errors?.recurring } />

                <FormField
                    className='text-black'
                    htmlFor='paid'
                    label='paid'
                    type='checkbox'
                    value={ formData.paid }
                    onChange={ (event: any) => triggerToggle(event, 'paid') }
                    error={ errors?.paid } />

                <div className='w-full text-container'>
                    <button type='submit'  >
                        Create a new Bill
                    </button>
                </div>
            </Form>
        </div>

    )
}
