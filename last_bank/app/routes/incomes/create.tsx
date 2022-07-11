import { ActionFunction, json, LoaderFunction, redirect } from '@remix-run/node';
import { Form, useActionData, useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import FormField from '~/components/form-field';
import ToggleButton from '~/components/ToggleButton';
import { getUserId, requireUserId } from '~/utils/auth.server';
import { createIncome } from '~/utils/income.server';
import { validateText, validateAmount, validateBoolean } from '~/utils/validators.server';

export const loader: LoaderFunction = async ({ request }) => {
    const userId = await getUserId(request);
    if (!userId) {
        throw new Response("Unauthorized", { status: 401 });
    }
    return json({ userId });

}

type ActionData = {
    formError?: string;
    fieldErrors?: {
        source: string | undefined;
        description: string | undefined;
        amount: number | undefined;
        payment_date: Date | undefined;
        received: boolean | null;
    };
    fields?: {
        source: string;
        description: string;
        amount: number;
        payment_date: Date;
        received: boolean;

    };
};
export const action: ActionFunction = async ({ request }) => {
    const userId = await requireUserId(request);

    let formData = await request.formData()
    let source = formData.get('source')
    let description = formData.get('description')
    let amount = Number(formData.get('amount'))
    // @ts-ignore
    let payment_date = new Date(formData.get("payment_date"));
    let received = Boolean(formData.get('received'))

    if (

        typeof source !== 'string' ||
        typeof description !== 'string' ||
        typeof userId !== 'string'

    ) {
        return json({ error: 'invalid form data' }, { status: 400 })
            ;
    }
    const errors = {
        source: validateText((source as string)),
        description: validateText((description as string)),
        amount: validateAmount((amount as number)),

        received: validateBoolean((received as boolean)),

    };


    if (Object.values(errors).some(Boolean))
        return json(
            {
                errors,
                fields: { source, description, amount, received, payment_date },
                form: action
            },
            { status: 400 }
        );
    const income = await createIncome({
        source,
        description,
        amount,
        payment_date,
        received,
        userId: userId

    })
    return redirect(`/incomes/${income.id}`)

}


export default function Create () {
    const { userId } = useLoaderData()
    const actionData = useActionData()
    console.log(userId);

    const [formError, setFormError] = useState(actionData?.error || '')
    const [errors, setErrors] = useState(actionData?.errors || {})

    const [formData, setFormData] = useState({
        source: '',
        description: '',
        amount: 0,
        due_date: '',
        received: false,
        userId: userId,


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
            <form method='post' className='rounded-2xl'>

                <FormField
                    className='text-black'
                    htmlFor='source'
                    label='Source'
                    name='source'
                    value={ formData.source }
                    onChange={ (event: any) => handleInputChange(event, 'source') }
                    error={ errors?.source }
                />
                <FormField
                    className='text-black'

                    htmlFor='description'
                    label='Description'
                    name='description'
                    value={ formData.description }
                    onChange={ (event: any) => handleInputChange(event, 'description') }
                    error={ errors?.description }
                />
                <FormField
                    className='text-black'

                    htmlFor='amount'
                    label='Amount'
                    name='amount'
                    type='number'
                    value={ formData.due_date }
                    onChange={ (event: any) => handleInputChange(event, 'due_date') }
                    error={ errors?.due_date }
                />


                <FormField
                    className='text-black'

                    htmlFor='payment_date'
                    label='payment_date'
                    type='date'
                    name='payment_date'
                    onChange={ (event: any) => handleInputChange(event, 'payment_date') }
                    error={ errors?.payment_date }

                />

                <FormField
                    className='text-black'

                    htmlFor='received'
                    label='received'
                    type='checkbox'
                    value={ formData.received }
                    onChange={ (event: any) => triggerToggle(event, 'received') }
                    error={ errors?.received } />


                <div className='w-full text-container'>
                    <button type='submit'  >
                        Create a new Income Source
                    </button>
                </div>
            </form>
        </div>
    )
}
