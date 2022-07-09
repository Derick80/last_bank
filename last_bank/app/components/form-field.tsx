import { useEffect, useState } from "react";

export interface FormFieldProps {
    htmlFor: string;
    label: string;
    type?: string;
    value: any;
    onChange?: (...args: any) => any;
    error?: string;
    className?: string;
}

export default function FormField ({
    htmlFor,
    label,
    type,
    value,
    onChange = () => { },
    error = '',
    className = '',
}: FormFieldProps) {
    const [errorText, setErrorText] = useState(error);

    return (
        < >
            <label htmlFor={ htmlFor }>{ label }</label>
            <input className={ className }
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
