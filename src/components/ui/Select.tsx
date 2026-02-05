import { forwardRef, type SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  options: SelectOption[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, placeholder, className, id, ...props }, ref) => {
    const selectId = id || label?.replace(/\s/g, '-').toLowerCase()

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-rich-cocoa mb-2"
          >
            {label}
            {props.required && <span className="text-deep-pomegranate mr-1">*</span>}
          </label>
        )}

        <select
          ref={ref}
          id={selectId}
          className={cn(
            'w-full px-4 py-3 rounded-lg',
            'bg-white/80 backdrop-blur-sm',
            'border border-rose-water/50',
            'text-rich-cocoa',
            'transition-all duration-200',
            'focus:outline-none focus:border-malabi-400 focus:ring-2 focus:ring-malabi-400/20',
            'appearance-none cursor-pointer',
            // Custom dropdown arrow
            'bg-no-repeat bg-[length:16px] bg-[center_left_1rem]',
            `bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234A3728'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")]`,
            error && 'border-red-400 focus:border-red-400 focus:ring-red-400/20',
            className
          )}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {error && (
          <p id={`${selectId}-error`} className="mt-2 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={`${selectId}-helper`} className="mt-2 text-sm text-delicate-gray">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
