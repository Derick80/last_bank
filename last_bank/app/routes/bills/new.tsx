import React, { useState } from 'react'
import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getUserId, requireUserId } from '~/utils/auth.server';
import { validateAmount, validateBoolean, validateText } from '~/utils/validators.server';
import { createBill } from '~/utils/users.server';
import { Form, useActionData, useLoaderData } from '@remix-run/react';
import Layout from '~/components/layout';
import FormField from '~/components/form-field';



export const loader: LoaderFunction = async ({ request }) => {
    const userId = await getUserId(request);
    if (!userId) {
        throw new Response("Unauthorized", { status: 401 });
    }
    return json({});

}

export const action: ActionFunction = async ({ request }) => {
    const userId = await requireUserId(request);

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

        recurring: validateBoolean((recurring)),
        paid: validateBoolean((paid))

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
    }, userId);

    return redirect(`/bills/${bill}`);
};



export default function New () {
    const actionData = useActionData()
    const { userId } = useLoaderData()
    const [formError, setFormError] = useState(actionData?.error || '')
    const [errors, setErrors] = useState(actionData?.errors || {})

    const [formData, setFormData] = useState({
        source: '',
        description: '',
        amount: 0,
        due_date: '',
        recurring: false,
        paid: false,

    });

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        field: string
    ) => {
        setFormData((form) => ({
            ...form,
            [field]: event.target.value
        }));
    };
    return (

        <div>
            <Form method='post' className='rounded-2xl'>

                <FormField
                    className='text-black'
                    htmlFor=''
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

                    htmlFor='reccuring'
                    label='reccuring'
                    type='checkbox'
                    value={ formData.recurring }
                    onChange={ (event: any) => handleInputChange(event, 'reccuring') }
                    error={ errors?.reccuring } />
                <FormField
                    className='text-black'

                    htmlFor='paid'
                    label='paid'
                    type='checkbox'
                    value={ formData.paid }
                    onChange={ (event: any) => handleInputChange(event, 'paid') }
                    error={ errors?.paid } />

                <div className='w-full text-container'>
                    <button type='submit' name='createBill' value='createBill' >
                        Create a new Bill
                    </button>
                </div>
            </Form>
        </div>

    )
}
