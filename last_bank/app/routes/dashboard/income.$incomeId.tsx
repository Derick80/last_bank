import type { Income } from '@prisma/client'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { json, redirect, Response } from '@remix-run/node'
import { useActionData, useLoaderData, useParams } from '@remix-run/react'
import { useState } from 'react'
import FormField from '~/components/form-field'
import { Modal } from '~/components/modal'
import { getUser, getUserId, requireUserId } from '~/utils/auth.server'
import { getOneUserIncome, updateOneUserIncome } from '~/utils/income.server'
import {
    validateText,
    validateAmount,
    validateBoolean
} from '~/utils/validators.server'

type LoaderData = {
    income: Income
    isOwner: boolean
}
export const loader: LoaderFunction = async ({ params, request }) => {
    // 2
    let userId = await getUserId(request)
    const user = await getUser(request)

    const incomeId = params.incomeId as string

    if (typeof incomeId !== 'string') {
        return redirect('/dashboard')
    }

    let income = userId ? await getOneUserIncome({ id: incomeId, userId }) : null
    if (!income) {
        throw new Response('Income not found', { status: 404 })
    }
    let data: LoaderData = { income, isOwner: userId == income.userId }
    return json({ data, user })
}

export const action: ActionFunction = async ({ request, params }) => {
    const incomeId = params.listId as string

    const userId = await requireUserId(request)
    let formData = await request.formData()
    const id = formData.get('id')
    let source = formData.get('source')
    let description = formData.get('description')
    let amount = Number(formData.get('amount'))
    // @ts-ignore
    let payment_date = new Date(formData.get('payment_date'))
    let received = Boolean(formData.get('received'))

    if (
        typeof id !== 'string' ||
        typeof source !== 'string' ||
        typeof description !== 'string' ||
        typeof userId !== 'string'
    ) {
        return json({ error: 'invalid form data' }, { status: 400 })
    }
    const errors = {
        source: validateText(source as string),
        description: validateText(description as string),
        amount: validateAmount(amount as number),

        received: validateBoolean(received as boolean)
    }

    if (Object.values(errors).some(Boolean))
        return json(
            {
                errors,
                fields: { source, description, amount, received, payment_date },
                form: action
            },
            { status: 400 }
        )

    await updateOneUserIncome({
        id: id,
        userId: userId,
        source,
        description,
        amount,
        received,
        payment_date
    })
    return redirect('/dashboard')
}
export default function IncomeModal () {
    const { data, user } = useLoaderData()
    const actionData = useActionData()
    const [errors, setErrors] = useState(actionData?.errors || {})
    const [formData, setFormData] = useState({
        id: data.income.id,
        source: data.income.source,
        description: data.income.description,
        amount: data.income.amount,
        payment_date: data.income.payment_date,
        received: data.income.required
    })

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLFormElement>,
        field: string
    ) => {
        setFormData((form) => ({
            ...form,
            [field]: event.target.value
        }))
    }

    const triggerToggle = (
        event: React.ChangeEvent<HTMLInputElement | HTMLFormElement>,
        field: string
    ) => {
        setFormData((form) => ({
            ...form,
            [field]: event.target.checked
        }))
    }
    return (
        <Modal isOpen={ true } className='w-2/3 p-10'>
            <form method='post' className='text-xl font-semibold'>
                <FormField
                    className='w-full p-2 rounded-xl my-2'
                    htmlFor='id'
                    label=''
                    name='id'
                    type='hidden'
                    value={ formData.id }
                    onChange={ (event: any) => handleInputChange(event, 'id') }
                    error={ errors?.id }
                />

                { data.source }
                <FormField
                    className='w-full p-2 rounded-xl my-2 text-black'
                    htmlFor='source'
                    label='Source'
                    name='source'
                    value={ formData.source }
                    onChange={ (event: any) => handleInputChange(event, 'source') }
                    error={ errors?.source }
                />

                { data.description }
                <FormField
                    className='w-full p-2 rounded-xl my-2 text-black'
                    htmlFor='description'
                    label='Description'
                    name='description'
                    value={ formData.description }
                    onChange={ (event: any) => handleInputChange(event, 'description') }
                    error={ errors?.description }
                />

                <FormField
                    className='w-full p-2 rounded-xl my-2 text-black'
                    htmlFor='amount'
                    label='Amount'
                    name='amount'
                    type='number'
                    value={ formData.amount }
                    onChange={ (event: any) => handleInputChange(event, 'amount') }
                    error={ errors?.amount }
                />

                <FormField
                    className='w-full p-2 rounded-xl my-2 text-black'
                    htmlFor='payment_date'
                    label='payment_date'
                    type='date'
                    name='payment_date'
                    value={ formData.payment_date }
                    onChange={ (event: any) => handleInputChange(event, 'payment_date') }
                    error={ errors?.payment_date }
                />

                <FormField
                    className='w-full p-2 rounded-xl my-2 text-black'
                    htmlFor='received'
                    label='received'
                    type='checkbox'
                    value={ formData.received }
                    onChange={ (event: any) => triggerToggle(event, 'received') }
                    error={ errors?.received }
                />

                <div className='self-center'>
                    <button
                        type='submit'
                        className='rounded-xl bg-blue-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover: bg:light-orange-400'
                    >
                        Create
                    </button>
                </div>
            </form>
        </Modal>
    )
}
