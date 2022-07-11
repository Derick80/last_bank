import React from 'react'
interface Props {
    defaultValue?: string
    children?: React.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
    onChange?: () => void
    className?: string
    id?: string
    role?: string
    name?: string
    value?: string
    type?: string

}

export default function Button ({ defaultValue, onClick, className, children, type, ...props }: Props) {

    return (
        <button className={ className } onClick={ onClick }>
            { children }

        </button>
    )
}
