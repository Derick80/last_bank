import React, { useState } from 'react'
import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getUser, register } from '~/utils/auth.server';
import { validateEmail, validatePassword, validateName, validateAmount, validateBoolean, validateText, validateDate } from '~/utils/validators.server';
import { createBill, updateBills, createIncomes, updateIncomes } from '~/utils/users.server';
import { useActionData, useLoaderData } from '@remix-run/react';
import Layout from '~/components/layout';
import FormField from '~/components/form-field';



export const loader: LoaderFunction = async ({ request }) => {
    return await getUser(request) ? redirect('/') : null
}

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData();
    const action = form.get('_action');
    const source = form.get('source');
    const description = form.get('description');
    let amount = Number(form.get('amount'))
    // @ts-ignore
    let due_date = new Date(form.get("due_date"));


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

    const errors = {
        source: validateText((source as string)),
        description: validateText((description as string)),
        amount: validateAmount((amount as number)),

        ...(action === 'createBills' || action === 'updateBills'
            ? {

                recurring: validateBoolean((recurring)),
                paid: validateBoolean((paid))

            }
            : {})
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

    switch (action) {
        case 'createBills': {
            return await createBill({ source, description, amount, recurring, paid, due_date }, userId);
        }

        case 'updateBills': {
            amount = amount as number;


            return await updateBills({ source, description, amount, recurring, paid, due_date }, userId);

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
    const [action, setAction] = useState('')

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
                        htmlFor=''
                        label=''
                        value={ formData.source }
                        onChange={ (event: any) => handleInputChange(event, 'source') }
                        error={ errors?.source } />
                    <FormField
                        htmlFor='description'
                        label='description'
                        value={ formData.description }
                        onChange={ (event: any) => handleInputChange(event, 'description') }
                        error={ errors?.description } />
                    <FormField
                        htmlFor='amount'
                        label='amount'
                        value={ formData.amount }
                        onChange={ (event: any) => handleInputChange(event, 'amount') }
                        error={ errors?.amount } />
                    { action === 'createBills' || action === 'updateBills' ? (
                        <>
                            <FormField
                                htmlFor='due_date'
                                label='due_date'
                                value={ formData.due_date }
                                onChange={ (event: any) => handleInputChange(event, 'due_date') }
                                error={ errors?.due_date } />
                            <FormField
                                htmlFor='reccuring'
                                label='reccuring'
                                value={ formData.recurring }
                                onChange={ (event: any) => handleInputChange(event, 'reccuring') }
                                error={ errors?.reccuring } />
                            <FormField
                                htmlFor='paid'
                                label='paid'
                                value={ formData.paid }
                                onChange={ (event: any) => handleInputChange(event, 'paid') }
                                error={ errors?.paid } />
                        </>
                    ) : null }

                </form>
            </div>
        </Layout>
    )
}
