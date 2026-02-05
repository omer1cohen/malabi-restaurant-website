import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

// Export variants for use with Link components
export const buttonVariants: Record<ButtonVariant, string> = {
  primary: cn(
    'bg-gradient-to-br from-deep-pomegranate to-golden-saffron',
    'text-white shadow-lg',
    'hover:shadow-xl hover:-translate-y-0.5',
    'active:translate-y-0 active:shadow-md'
  ),
  outline: cn(
    'bg-transparent border-2 border-rose-water',
    'text-rich-cocoa',
    'hover:bg-gradient-to-br hover:from-rose-water hover:to-pistachio-mint',
    'hover:border-golden-saffron hover:-translate-y-0.5'
  ),
  ghost: cn(
    'bg-transparent text-rich-cocoa',
    'hover:bg-rose-water/50'
  ),
}

export const buttonSizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

// Base button classes
export const buttonBase = cn(
  'inline-flex items-center justify-center gap-2',
  'rounded-lg font-medium',
  'transition-all duration-300',
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-malabi-400 focus-visible:ring-offset-2',
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
)

// Helper to get button classes
export function getButtonClasses(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string
): string {
  return cn(buttonBase, buttonVariants[variant], buttonSizes[size], className)
}

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  asMotion?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      className,
      disabled,
      asMotion = true,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading

    const buttonClasses = getButtonClasses(variant, size, className)

    const content = (
      <>
        {isLoading && (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {!isLoading && leftIcon}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </>
    )

    if (asMotion && !isDisabled) {
      return (
        <motion.button
          ref={ref}
          className={buttonClasses}
          disabled={isDisabled}
          whileTap={{ scale: 0.97 }}
          {...(props as HTMLMotionProps<'button'>)}
        >
          {content}
        </motion.button>
      )
    }

    return (
      <button ref={ref} className={buttonClasses} disabled={isDisabled} {...props}>
        {content}
      </button>
    )
  }
)

Button.displayName = 'Button'
