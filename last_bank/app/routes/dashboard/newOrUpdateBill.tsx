import React, { useState } from 'react'
import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getUser, register, requireUserId } from '~/utils/auth.server';
import { validateEmail, validatePassword, validateName, validateAmount, validateBoolean, validateText, validateDate } from '~/utils/validators.server';
import { createBill, updateBills, createIncomes, updateIncomes } from '~/utils/users.server';
import { useActionData, useLoaderData, useNavigate } from '@remix-run/react';
import Layout from '~/components/layout';
import FormField from '~/components/form-field';
import Button from '~/components/Button';



export const loader: LoaderFunction = async ({ request }) => {

    const { userId } = await requireUserId(request)

    return json({ userId })
}

export const action: ActionFunction = async ({
    request }) => {
    const { userId } = await requireUserId(request)

    const form = await request.formData();
    const action = form.get('_action');
    const source = form.get('source');
    const description = form.get('description');
    let amount = Number(form.get('amount'))
    // @ts-ignore
    let due_date = new Date(form.get("due_date"));
    // @ts-ignore
    let payment_date = new Date(form.get("payment_date"));

    let recurring = Boolean(form.get('recurring'));

    let paid = Boolean(form.get('paid'));


    if (
        typeof action !== 'string' ||
        typeof source !== 'string' ||
        typeof description !== 'string' ||
        typeof amount !== 'number'
    ) {
        return json({ error: 'invalid form data', form: action }, { status: 400 })
            ;
    }
    const billFields = { source, amount, description, due_date, recurring, paid, userId }

    const errors = {
        source: validateText((source as string)),
        description: validateText((description as string)),
        amount: validateAmount((amount as number)),

        ...(action === 'createBills' || action === 'updateBills'
            ? {

                recurring: validateBoolean((recurring)),
                paid: validateBoolean((paid))

            }
            : {}),

    };

    if (Object.values(errors).some(Boolean))
        return json(
            {
                errors,
                fields: { source, description, amount, recurring, paid, due_date, userId },
                form: action
            },
            { status: 400 }
        );

    switch (action) {
        case 'createBills': {
            await createBill(billFields);
        }

        case 'updateBills': {
            amount = amount as number;


            return await updateBills(billFields, userId);

        }
        default:
            return json({ error: `Invalid Form Data` }, { status: 400 });
    }
};



export default function New () {
    const actionData = useActionData()
    const { userId } = useLoaderData()
    const [formError, setFormError] = useState(actionData?.error || '')
    const [errors, setErrors] = useState(actionData?.errors || {})
    const [action, setAction] = useState('createBills')

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
        <Layout>
            <div>
                <form method='post' className='rounded-2xl'>
                    <FormField
                        htmlFor='source'
                        label='Source'
                        type='text'
                        value={ formData.source }
                        onChange={ (event: any) => handleInputChange(event, 'source') }
                        error={ errors?.source } />
                    <FormField
                        htmlFor='description'
                        label='description'
                        type='text'
                        value={ formData.description }
                        onChange={ (event: any) => handleInputChange(event, 'description') }
                        error={ errors?.description } />
                    <FormField
                        htmlFor='amount'
                        label='amount'
                        type='text'
                        value={ formData.amount }
                        onChange={ (event: any) => handleInputChange(event, 'amount') }
                        error={ errors?.amount } />
                    { action === 'createBills' || action === 'updateBills' ? (
                        <>
                            <FormField
                                htmlFor='due_date'
                                label='due_date'
                                type='date'
                                value={ formData.due_date }
                                onChange={ (event: any) => handleInputChange(event, 'due_date') }
                                error={ errors?.due_date } />
                            <FormField
                                htmlFor='reccuring'
                                label='reccuring'
                                type='checkbox'
                                value={ formData.recurring }
                                onChange={ (event: any) => handleInputChange(event, 'reccuring') }
                                error={ errors?.reccuring } />
                            <FormField
                                htmlFor='paid'
                                label='paid'
                                type='checkbox'
                                value={ formData.paid }
                                onChange={ (event: any) => handleInputChange(event, 'paid') }
                                error={ errors?.paid } />
                        </>
                    ) : null }

                    <Button className='rounded-xl bg-yellow-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover:bg-yellow-50' type='submit' >Add</Button>
                </form>
            </div>
        </Layout>
    )
}
