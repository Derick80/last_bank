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
    type,
    value,
    onChange = () => { },
    error = ''
}: FormFieldProps) {
    const [errorText, setErrorText] = useState(error);

    return (
        <>
            <label className="text-black-600 font-semibold" htmlFor={ htmlFor }>{ label }</label>
            <input className="text-black"
                onChange={ (event) => {
                    onChange(event);
                    setErrorText('');
                } }
                type={ type }
                id={ htmlFor }
                name={ htmlFor }
                value={ value }

            />
            <div>{ errorText || '' }</div>
        </>
    );
}
