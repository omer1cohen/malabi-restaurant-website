import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/stores/cartStore'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'בית' },
  { href: '/menu', label: 'תפריט' },
  { href: '/order', label: 'הזמנה' },
]

export function Header() {
  const location = useLocation()
  const { toggleCart, getTotalCount } = useCartStore()
  const cartCount = getTotalCount()

  return (
    <header className="sticky top-0 z-40 backdrop-blur-heavy bg-white/70 border-b border-rose-water/60">
      <div className="container-custom h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="font-semibold tracking-tight text-2xl sm:text-3xl text-zinc-900">
            מיסטר מלבי
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => {
            const isActive = location.pathname === link.href
            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium transition-colors duration-300',
                  isActive
                    ? 'text-malabi-600 bg-rose-water/50'
                    : 'text-zinc-600 hover:text-malabi-600 hover:bg-rose-water/30'
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Cart Button */}
        <motion.button
          onClick={toggleCart}
          className={cn(
            'relative flex items-center gap-2',
            'px-4 py-2 rounded-lg',
            'bg-gradient-to-br from-rose-water to-pistachio-mint',
            'border border-rose-water/50',
            'text-rich-cocoa font-medium',
            'transition-all duration-300',
            'hover:shadow-lg hover:-translate-y-0.5',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-malabi-400 focus-visible:ring-offset-2'
          )}
          whileTap={{ scale: 0.97 }}
          aria-label={`עגלת קניות${cartCount > 0 ? `, ${cartCount} פריטים` : ''}`}
        >
          <span className="text-lg">🛒</span>
          <span className="hidden sm:inline">עגלה</span>

          {/* Cart Count Badge */}
          <AnimatePresence>
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className={cn(
                  'absolute -top-2 -left-2',
                  'flex items-center justify-center',
                  'w-6 h-6 rounded-full',
                  'bg-gradient-to-br from-deep-pomegranate to-golden-saffron',
                  'text-white text-xs font-bold',
                  'shadow-md'
                )}
              >
                {cartCount}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-rose-water/30 transition-colors"
          aria-label="תפריט"
        >
          <svg
            className="w-6 h-6 text-rich-cocoa"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation - Simple version */}
      <nav className="md:hidden border-t border-rose-water/30">
        <div className="container-custom flex justify-around py-2">
          {navLinks.map(link => {
            const isActive = location.pathname === link.href
            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium text-sm transition-colors',
                  isActive
                    ? 'text-malabi-600 bg-rose-water/50'
                    : 'text-zinc-600 hover:text-malabi-600'
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
