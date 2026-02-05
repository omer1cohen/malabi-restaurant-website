import { motion } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface GalleryImage {
  id: string
  src: string
  alt: string
  caption: string
  likes: number
}

// Sample gallery images - using existing product images
// In production, these would come from Instagram API
const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: '/assets/images/products/malabi-classic.jpg',
    alt: 'מלאבי קלאסי עם סירופ ורדים',
    caption: 'הקלאסי שלנו 🌹',
    likes: 234,
  },
  {
    id: '2',
    src: '/assets/images/products/malabi-pistachio.jpg',
    alt: 'מלאבי פיסטוק',
    caption: 'ירוק ומפנק 💚',
    likes: 189,
  },
  {
    id: '3',
    src: '/assets/images/products/malabi-chocolate.jpg',
    alt: 'מלאבי שוקולד',
    caption: 'לחובבי השוקולד 🍫',
    likes: 312,
  },
  {
    id: '4',
    src: '/assets/images/products/262090509_4389505947825248_8832357676231285171_n.jpg',
    alt: 'מלאבי עונתי',
    caption: 'טעם החג ✨',
    likes: 156,
  },
  {
    id: '5',
    src: '/assets/images/products/170039729_484435626248915_4930472994070767254_n.jpg',
    alt: 'הגשת מלאבי',
    caption: 'רגע לפני... 🥄',
    likes: 278,
  },
  {
    id: '6',
    src: '/assets/images/products/malabi-family-pack.jpg',
    alt: 'מלאבי משפחתי',
    caption: 'לכל המשפחה 👨‍👩‍👧‍👦',
    likes: 201,
  },
]

// Organic rotation angles for polaroid effect
const rotations = [-3, 2, -1.5, 2.5, -2, 1.5]

// Staggered container animation
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

// Individual card animation
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.9,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
}

function GalleryCard({ image, index }: { image: GalleryImage; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)
  const rotation = rotations[index % rotations.length]

  return (
    <motion.div
      variants={cardVariants}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.article
        className={cn(
          'relative bg-white rounded-lg overflow-hidden',
          'shadow-[0_4px_20px_rgba(74,55,40,0.1),0_8px_40px_rgba(201,76,109,0.08)]',
          'transition-shadow duration-300',
          'hover:shadow-[0_8px_30px_rgba(74,55,40,0.15),0_16px_60px_rgba(201,76,109,0.12)]'
        )}
        style={{
          transform: `rotate(${rotation}deg)`,
        }}
        whileHover={{
          scale: 1.03,
          rotate: 0,
          transition: { type: 'spring', stiffness: 300, damping: 20 }
        }}
      >
        {/* Polaroid-style white border */}
        <div className="p-2 pb-12">
          {/* Image container */}
          <div className="relative aspect-square overflow-hidden rounded-sm bg-rose-water/20">
            <img
              src={imageError ? '/assets/images/placeholder-malabi.svg' : image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
              onError={() => setImageError(true)}
            />

            {/* Hover overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-gradient-to-t from-rich-cocoa/60 via-transparent to-transparent flex items-end justify-center pb-4"
            >
              {/* Instagram icon */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 text-white"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="text-sm font-medium">צפייה</span>
              </motion.div>
            </motion.div>

            {/* Likes indicator */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: isHovered ? 1 : 0,
                opacity: isHovered ? 1 : 0
              }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 400 }}
              className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1"
            >
              <svg className="w-4 h-4 text-deep-pomegranate" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
              </svg>
              <span className="text-xs font-semibold text-rich-cocoa">{image.likes}</span>
            </motion.div>
          </div>
        </div>

        {/* Caption area - polaroid style */}
        <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
          <p className="text-sm text-rich-cocoa font-medium text-center truncate">
            {image.caption}
          </p>
        </div>
      </motion.article>

      {/* Decorative shadow underneath */}
      <div
        className="absolute -bottom-2 left-4 right-4 h-4 bg-rich-cocoa/5 rounded-full blur-md -z-10"
        style={{ transform: `rotate(${rotation}deg)` }}
      />
    </motion.div>
  )
}

export function InstagramGallery() {
  return (
    <section className="section relative overflow-hidden">
      {/* Background with organic shapes */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream-white via-rose-water/10 to-pistachio-mint/20">
        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-20 right-[10%] w-16 h-16 rounded-full bg-pistachio-mint/30 blur-xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-32 left-[15%] w-20 h-20 rounded-full bg-rose-water/40 blur-xl"
          animate={{
            y: [0, 15, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 right-[5%] w-12 h-12 rounded-full bg-golden-saffron/20 blur-lg"
          animate={{
            x: [0, 10, 0],
            y: [0, -10, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      <div className="container-custom relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">עוקבים אחרינו</h2>

          {/* Instagram handle */}
          <motion.a
            href="https://instagram.com/mister.malabi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white font-medium text-sm hover:shadow-lg hover:shadow-[#833AB4]/25 transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>@mister.malabi</span>
          </motion.a>
        </motion.div>

        {/* Gallery grid - asymmetric masonry */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto"
        >
          {galleryImages.map((image, index) => (
            <GalleryCard key={image.id} image={image} index={index} />
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-10 text-delicate-gray"
        >
          שתפו אותנו בתמונות שלכם עם{' '}
          <span className="text-deep-pomegranate font-semibold">#מיסטרמלבי</span>
        </motion.p>
      </div>
    </section>
  )
}
