import { useState } from 'react'
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
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 backdrop-blur-heavy bg-white/80 border-b border-rose-water/40 shadow-sm">
      <div className="container-custom h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl" aria-hidden>🍨</span>
          <span className="font-hebrew font-extrabold text-2xl sm:text-[1.65rem] tracking-tight text-rich-cocoa group-hover:text-deep-pomegranate transition-colors">
            מיסטר מלבי
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => {
            const isActive = location.pathname === link.href
            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200',
                  isActive
                    ? 'text-deep-pomegranate bg-rose-water/50'
                    : 'text-rich-cocoa/70 hover:text-deep-pomegranate hover:bg-rose-water/30'
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Right side: Cart + Mobile Hamburger */}
        <div className="flex items-center gap-2">
          {/* Cart Button */}
          <motion.button
            onClick={toggleCart}
            className={cn(
              'relative flex items-center gap-2',
              'px-3.5 py-2 rounded-lg',
              'bg-cream-white border border-rose-water/50',
              'text-rich-cocoa font-medium text-sm',
              'transition-all duration-200',
              'hover:shadow-md hover:border-rose-water',
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
                    'w-5 h-5 rounded-full',
                    'bg-deep-pomegranate',
                    'text-white text-[11px] font-bold',
                    'shadow-sm'
                  )}
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-rose-water/30 transition-colors"
            onClick={() => setMobileOpen(prev => !prev)}
            aria-label={mobileOpen ? 'סגור תפריט' : 'פתח תפריט'}
            aria-expanded={mobileOpen}
          >
            <svg
              className="w-6 h-6 text-rich-cocoa"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Animated */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden overflow-hidden border-t border-rose-water/30 bg-white/90 backdrop-blur-sm"
          >
            <div className="container-custom flex flex-col py-2 gap-1">
              {navLinks.map(link => {
                const isActive = location.pathname === link.href
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'px-4 py-2.5 rounded-lg font-medium text-sm transition-colors',
                      isActive
                        ? 'text-deep-pomegranate bg-rose-water/40'
                        : 'text-rich-cocoa/70 hover:text-deep-pomegranate hover:bg-rose-water/20'
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
