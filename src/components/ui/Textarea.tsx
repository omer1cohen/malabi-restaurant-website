import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const textareaId = id || label?.replace(/\s/g, '-').toLowerCase()

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-rich-cocoa mb-2"
          >
            {label}
            {props.required && <span className="text-deep-pomegranate mr-1">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'w-full px-4 py-3 rounded-lg',
            'bg-white/80 backdrop-blur-sm',
            'border border-rose-water/50',
            'text-rich-cocoa placeholder-delicate-gray',
            'transition-all duration-200',
            'focus:outline-none focus:border-malabi-400 focus:ring-2 focus:ring-malabi-400/20',
            'resize-y min-h-[100px]',
            error && 'border-red-400 focus:border-red-400 focus:ring-red-400/20',
            className
          )}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
          {...props}
        />

        {error && (
          <p id={`${textareaId}-error`} className="mt-2 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={`${textareaId}-helper`} className="mt-2 text-sm text-delicate-gray">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
