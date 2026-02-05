import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getButtonClasses } from '@/components/ui/Button'

const entrance = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: 'spring', duration: 0.55, bounce: 0, delay },
  }),
}

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      <img
        src="/assets/images/hero-custom.png"
        alt="רקע של קינוחי מלבי"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/45 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/15" />

      <div className="container-custom relative z-10 py-24 md:py-32">
        <motion.div
          initial="hidden"
          animate="visible"
          className="text-center lg:text-right max-w-3xl mx-auto lg:mr-0 lg:ml-auto"
        >
          <motion.span
            variants={entrance}
            custom={0}
            className="inline-block px-4 py-2 rounded-full bg-white/20 text-white font-medium text-sm mb-6 border border-white/30 backdrop-blur-sm"
          >
            קינוחים מזרח תיכוניים מסורתיים
          </motion.span>

          <motion.h1
            variants={entrance}
            custom={0.08}
            className="font-display text-5xl sm:text-6xl md:text-7xl font-light leading-[0.95] mb-6 text-balance text-white drop-shadow-md"
          >
            מיסטר מלבי
          </motion.h1>

          <motion.p
            variants={entrance}
            custom={0.16}
            className="text-xl md:text-2xl text-white/95 mb-4 font-light text-pretty"
          >
            טעמים אותנטיים של המזרח התיכון
          </motion.p>

          <motion.p
            variants={entrance}
            custom={0.22}
            className="text-lg text-white/90 mb-8 max-w-xl mx-auto lg:mr-0 text-pretty"
          >
            מלאבי מסורתי עשוי באהבה מחומרים טריים ואיכותיים.
            <br className="hidden sm:block" />
            הזמינו עכשיו ותיהנו מחוויה קולינרית מיוחדת!
          </motion.p>

          <motion.div
            variants={entrance}
            custom={0.28}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <Link to="/menu" className={getButtonClasses('primary', 'lg')}>
              לתפריט שלנו
              <span className="mr-2">←</span>
            </Link>
            <Link
              to="/order"
              className={getButtonClasses(
                'outline',
                'lg',
                'border-white/70 text-white hover:bg-white/20 hover:border-white'
              )}
            >
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
          className="size-10 rounded-full border-2 border-white/55 flex items-start justify-center pt-2"
        >
          <div className="size-1.5 rounded-full bg-white/75" />
        </motion.div>
      </motion.div>
    </section>
  )
}
