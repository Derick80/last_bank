// app/components/modal.tsx
import { Portal } from './portal'
import { useNavigate } from '@remix-run/react'

interface props {
    children: React.ReactNode
    isOpen: boolean
    ariaLabel?: string
    className?: string
}

export const Modal: React.FC<props> = ({ children, isOpen, ariaLabel, className }) => {
    const navigate = useNavigate()
    if (!isOpen) return null

    return (
        <Portal wrapperId="modal">
            <div
                className="fixed inset-0 overflow-y-auto bg-slate-300 opacity-50 dark:bg-zinc-600 dark:bg-opacity-50"
                aria-labelledby={ ariaLabel ?? 'modal-title' }
                role="dialog"
                aria-modal="true"
                onClick={ () => navigate('/dashboard') }
            ></div>
            <div className="fixed inset-0 pointer-events-none flex justify-center items-center max-h-screen overflow-scroll">
                <div className={ `${className} p-4 bg-slate-300 dark:bg-zinc-700 pointer-events-auto max-h-screen md:rounded-xl` }>
                    {/* This is where the modal content is rendered  */ }
                    { children }
                </div>
            </div>
        </Portal>
    )
}