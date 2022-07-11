import { ActionFunction, json, LoaderFunction, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import FormField from '~/components/form-field';
import ToggleButton from '~/components/ToggleButton';
import { getUserId, requireUserId } from '~/utils/auth.server';
import { createIncome } from '~/utils/income.server';

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
    console.log(userId);

    return (
        <div>
            <form method='post' className='rounded-2xl'>

                <FormField
                    className='text-black'
                    htmlFor=''
                    label='Source'
                    name='source'
                />
                <FormField
                    className='text-black'

                    htmlFor='description'
                    label='Description'
                    name='description'
                />
                <FormField
                    className='text-black'

                    htmlFor='amount'
                    label='Amount'
                    name='amount'
                    type='number'
                />


                <FormField
                    className='text-black'

                    htmlFor='payment_date'
                    label='payment_date'
                    type='date'
                    name='payment_date'

                />

                <ToggleButton />

                <div className='w-full text-container'>
                    <button type='submit'  >
                        Create a new Bill
                    </button>
                </div>
            </form>
        </div>
    )
}
