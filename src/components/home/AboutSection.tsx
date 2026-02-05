import { motion } from 'framer-motion'

export function AboutSection() {
  return (
    <section id="about" className="section bg-gradient-to-br from-silk-cream via-rose-water/30 to-pistachio-mint/40 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-golden-saffron/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-rose-water/20 blur-3xl" />
      </div>

      <div className="container-custom relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-water to-pistachio-mint rounded-2xl transform rotate-3 opacity-60" />
              <img
                src="/assets/images/about-malabi.jpg"
                alt="מלאבי מסורתי"
                className="relative rounded-2xl shadow-luxury w-full aspect-[4/3] object-cover"
                onError={e => {
                  e.currentTarget.src = '/assets/images/placeholder-malabi.svg'
                }}
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 md:order-2"
          >
            <h2 className="section-title text-right mb-8">
              הסיפור שלנו
            </h2>

            <div className="space-y-4 text-soft-charcoal">
              <p className="text-lg leading-relaxed">
                <span className="text-deep-pomegranate font-semibold">מיסטר מלבי</span> נוסד מתוך אהבה לקינוחים המסורתיים של המזרח התיכון. אנו מכינים כל מלאבי בעבודת יד, מחומרים טריים ואיכותיים.
              </p>

              <p className="text-lg leading-relaxed">
                המתכונים שלנו עוברים במשפחה מדור לדור, ואנו גאים להביא לכם את הטעמים האותנטיים שזוכרים מהבית.
              </p>

              <p className="text-lg leading-relaxed">
                מסירופ ורדים מקורי ועד פיסטוקים קלויים טריים - כל רכיב נבחר בקפידה כדי להעניק לכם חוויה קולינרית בלתי נשכחת.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { icon: '🥛', text: 'חומרים טריים' },
                { icon: '👨‍🍳', text: 'עבודת יד' },
                { icon: '🚚', text: 'משלוח מהיר' },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center p-4 bg-white/60 rounded-xl backdrop-blur-sm"
                >
                  <span className="text-3xl mb-2 block">{feature.icon}</span>
                  <span className="text-sm font-medium text-rich-cocoa">
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
