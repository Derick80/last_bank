import { useEffect, useState } from "react";

export interface FormFieldProps {
    htmlFor: string;
    label: string;
    type?: string;
    value: any;
    onChange?: (...args: any) => any;
    error?: string;
}

export default function FormField ({
    htmlFor,
    label,
    type = 'text',
    value,
    onChange = () => { },
    error = ''
}: FormFieldProps) {
    const [errorText, setErrorText] = useState(error);

    return (
        <>
            <label htmlFor={ htmlFor }>{ label }</label>
            <input
                onChange={ (event) => {
                    onChange(event);
                    setErrorText('');
                } }
                type={ type }
                name={ htmlFor }
                value={ value }
            />
            <div>{ errorText || '' }</div>
        </>
    );
}
