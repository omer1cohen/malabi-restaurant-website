import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getButtonClasses } from '@/components/ui/Button'

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background with Liquid Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream-white via-rose-water/20 to-pistachio-mint/30">
        {/* Watercolor Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
          style={{
            backgroundImage: 'url(/assets/images/pink-watercolor-bg.png)',
          }}
        />

        {/* Animated Gradients */}
        <motion.div
          className="absolute inset-0 liquid-bg"
          animate={{
            background: [
              'radial-gradient(circle at 20% 80%, rgba(255, 228, 232, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(255, 228, 232, 0.3) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(255, 215, 0, 0.2) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
        />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm text-deep-pomegranate font-medium text-sm mb-6 border border-rose-water/30"
          >
            🍨 קינוחים מזרח תיכוניים מסורתיים
          </motion.span>

          {/* Title */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[0.95] mb-6">
            <span className="text-gradient-primary animate-gradient bg-[length:200%_200%]">
              מיסטר מלבי
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl text-soft-charcoal mb-4 font-light"
          >
            טעמים אותנטיים של המזרח התיכון
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg text-delicate-gray mb-8 max-w-xl mx-auto"
          >
            מלאבי מסורתי עשוי באהבה מחומרים טריים ואיכותיים. הזמינו עכשיו ותיהנו מחוויה קולינרית מיוחדת!
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/menu" className={getButtonClasses('primary', 'lg')}>
              לתפריט שלנו
              <span className="mr-2">←</span>
            </Link>

            <Link to="/order" className={getButtonClasses('outline', 'lg')}>
              הזמנה מהירה
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 right-1/2 translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-rich-cocoa/30 flex items-start justify-center pt-2"
        >
          <div className="w-1.5 h-2.5 rounded-full bg-rich-cocoa/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}
