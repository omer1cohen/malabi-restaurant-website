import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const inputId = id || label?.replace(/\s/g, '-').toLowerCase()

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-rich-cocoa mb-2"
          >
            {label}
            {props.required && <span className="text-deep-pomegranate mr-1">*</span>}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4 py-3 rounded-lg',
            'bg-white/80 backdrop-blur-sm',
            'border border-rose-water/50',
            'text-rich-cocoa placeholder-delicate-gray',
            'transition-all duration-200',
            'focus:outline-none focus:border-malabi-400 focus:ring-2 focus:ring-malabi-400/20',
            error && 'border-red-400 focus:border-red-400 focus:ring-red-400/20',
            className
          )}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />

        {error && (
          <p id={`${inputId}-error`} className="mt-2 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-2 text-sm text-delicate-gray">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
