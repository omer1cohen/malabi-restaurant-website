import { Link } from 'react-router-dom'
import { getWhatsAppPhoneDisplay } from '@/lib/whatsapp'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const phoneDisplay = getWhatsAppPhoneDisplay()

  return (
    <footer className="bg-gradient-to-br from-pistachio-mint via-deep-pomegranate/80 to-golden-saffron text-rich-cocoa mt-auto">
      {/* Decorative overlay */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

        <div className="container-custom py-12 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div>
              <h3 className="font-display text-2xl font-medium mb-4">מיסטר מלבי</h3>
              <p className="text-rich-cocoa/80 leading-relaxed">
                קינוחים מזרח תיכוניים מסורתיים, עשויים באהבה מחומרים טריים ואיכותיים.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-medium text-lg mb-4">ניווט מהיר</h4>
              <nav className="flex flex-col gap-2">
                <Link
                  to="/"
                  className="text-rich-cocoa/80 hover:text-white transition-colors"
                >
                  בית
                </Link>
                <Link
                  to="/menu"
                  className="text-rich-cocoa/80 hover:text-white transition-colors"
                >
                  תפריט
                </Link>
                <Link
                  to="/order"
                  className="text-rich-cocoa/80 hover:text-white transition-colors"
                >
                  הזמנה
                </Link>
              </nav>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-medium text-lg mb-4">צור קשר</h4>
              <div className="space-y-2 text-rich-cocoa/80">
                <p className="flex items-center gap-2">
                  <span>📞</span>
                  <a
                    href={`tel:${phoneDisplay.replace(/-/g, '')}`}
                    className="hover:text-white transition-colors"
                    dir="ltr"
                  >
                    {phoneDisplay}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span>💬</span>
                  <span>זמינים בוואטסאפ</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>📍</span>
                  <span>תל אביב והסביבה</span>
                </p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-rich-cocoa/70 text-sm">
              © {currentYear} מיסטר מלבי. כל הזכויות שמורות.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
