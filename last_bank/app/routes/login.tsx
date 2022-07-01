import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { useActionData } from '@remix-run/react'

import { json, redirect } from '@remix-run/node';
import React, { useState } from 'react';
import FormField from '~/components/form-field';
import Layout from '~/components/layout';
import { getUser, login, register } from '~/utils/auth.server';
import {
    validateEmail,
    validateName,
    validatePassword
} from '~/utils/validators.server';


export const loader: LoaderFunction = async ({ request }) => {
    return await getUser(request) ? redirect('/dashboard') : null
}
export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData();
    const action = form.get('_action');
    const email = form.get('email');
    const password = form.get('password');
    let firstName = form.get('firstName');
    let lastName = form.get('lastName');

    if (
        typeof action !== 'string' ||
        typeof email !== 'string' ||
        typeof password !== 'string'
    ) {
        return json({ error: 'invalid form data', form: action }, { status: 400 })
            ;
    }

    if (
        action === 'register' &&
        (typeof firstName !== 'string' || typeof lastName !== 'string')
    ) {
        return json({ error: `Invalid names` }, { status: 400 });
    }


    const errors = {
        email: validateEmail(email),
        password: validatePassword(password),
        ...(action === 'register'
            ? {
                firstName: validateName((firstName as string) || ''),
                lastName: validateName((lastName as string) || '')
            }
            : {})
    };

    if (Object.values(errors).some(Boolean))
        return json(
            {
                errors,
                fields: { email, password, firstName, lastName },
                form: action
            },
            { status: 400 }
        );

    switch (action) {
        case 'login': {
            return await login({ email, password });
        }
        case 'register': {
            firstName = firstName as string;
            lastName = lastName as string;
            return await register({ email, password, firstName, lastName });
        }
        default:
            return json({ error: `Invalid Form Data` }, { status: 400 });
    }
};

export default function Login () {
    const actionData = useActionData()
    const [formError, setFormError] = useState(actionData?.error || '')
    const [errors, setErrors] = useState(actionData?.errors || {})
    const [action, setAction] = useState('login')

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
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
                <button
                    onClick={ () => setAction(action == 'login' ? 'register' : 'login') }
                    className='absolute top-8 right-8 roundex-xl bg-light-blue font-semibold text-black-600 px-3 py-2 transition duration-300 ease-in-out hover: bg:light-orange-400'
                >
                    { action === 'login' ? 'Register' : 'Sign In' }
                </button>
                <h2 className='text-5xl font-extrabold'>Welcome to my bank</h2>
                <p className='text-2xl font-bold'>
                    { action === 'login' ? 'Please Login to give some Play' : 'Sign up to get Started' }
                </p>
                <form method='post' className='rounded-2xl'>
                    <div className='text-xs font-semibold text-center tracking-wide text-red-500 w-full'>
                        { formError }
                    </div>
                    <FormField
                        htmlFor='email'
                        label='email'
                        value={ formData.email }
                        onChange={ (event) => handleInputChange(event, 'email') }
                        error={ errors?.email }

                    />
                    <FormField
                        htmlFor='password'
                        label='password'
                        value={ formData.password }
                        type='password'
                        onChange={ (event) => handleInputChange(event, 'password') }
                        error={ errors?.password }

                    />
                    { action !== 'login' ? (
                        <>
                            <FormField
                                htmlFor='firstName'
                                label='firstName'
                                value={ formData.firstName }
                                onChange={ (event) => handleInputChange(event, 'firstName') }
                                error={ errors?.firstName }

                            />
                            <FormField
                                htmlFor='lastName'
                                label='lastName'
                                value={ formData.lastName }
                                onChange={ (event) => handleInputChange(event, 'lastName') }
                                error={ errors?.lastName }

                            />
                        </>
                    ) : null }
                    <div className='w-full text-container'>
                        <button type='submit' name='_action' value={ action }>
                            { action === 'login' ? 'Please log in' : 'Sign up' }
                        </button>
                    </div>
                </form>

            </div>
        </Layout>
    );
}
