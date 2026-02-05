import { motion } from 'framer-motion'
import { STAGGER_CONTAINER, STAGGER_ITEM } from '@/lib/constants'

const badges = [
  {
    icon: '🏆',
    title: 'איכות מעולה',
    description: 'חומרי גלם טריים ואיכותיים בלבד',
  },
  {
    icon: '🚀',
    title: 'משלוח מהיר',
    description: 'משלוחים לתל אביב והסביבה',
  },
  {
    icon: '💯',
    title: 'שביעות רצון',
    description: 'אלפי לקוחות מרוצים',
  },
  {
    icon: '💬',
    title: 'שירות אישי',
    description: 'תמיכה בוואטסאפ 24/7',
  },
]

export function TrustBadges() {
  return (
    <section className="py-12 bg-white/50 backdrop-blur-sm border-y border-rose-water/30">
      <div className="container-custom">
        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              variants={STAGGER_ITEM}
              className="text-center"
            >
              <span className="text-4xl mb-3 block">{badge.icon}</span>
              <h3 className="font-semibold text-rich-cocoa mb-1">{badge.title}</h3>
              <p className="text-sm text-delicate-gray">{badge.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
