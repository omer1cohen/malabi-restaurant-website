import { Link } from 'react-router-dom'
import { getWhatsAppPhoneDisplay } from '@/lib/whatsapp'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const phoneDisplay = getWhatsAppPhoneDisplay()

  return (
    <footer className="bg-rich-cocoa text-white/85 mt-auto">
      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-deep-pomegranate via-golden-saffron to-pistachio-mint" />

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🍨</span>
              <h3 className="font-hebrew font-extrabold text-xl text-white">מיסטר מלבי</h3>
            </div>
            <p className="text-white/60 leading-relaxed text-sm">
              קינוחים מזרח תיכוניים מסורתיים, עשויים באהבה מחומרים טריים ואיכותיים.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">ניווט מהיר</h4>
            <nav className="flex flex-col gap-2">
              <Link
                to="/"
                className="text-white/60 hover:text-golden-saffron transition-colors text-sm"
              >
                בית
              </Link>
              <Link
                to="/menu"
                className="text-white/60 hover:text-golden-saffron transition-colors text-sm"
              >
                תפריט
              </Link>
              <Link
                to="/order"
                className="text-white/60 hover:text-golden-saffron transition-colors text-sm"
              >
                הזמנה
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-white mb-4">צור קשר</h4>
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2.5 text-white/60">
                <span className="text-base">📞</span>
                <a
                  href={`tel:${phoneDisplay.replace(/-/g, '')}`}
                  className="hover:text-golden-saffron transition-colors"
                  dir="ltr"
                >
                  {phoneDisplay}
                </a>
              </p>
              <p className="flex items-center gap-2.5 text-white/60">
                <span className="text-base">💬</span>
                <span>זמינים בוואטסאפ</span>
              </p>
              <p className="flex items-center gap-2.5 text-white/60">
                <span className="text-base">📍</span>
                <span>תל אביב והסביבה</span>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-10 pt-6 text-center">
          <p className="text-white/40 text-xs">
            © {currentYear} מיסטר מלבי. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  )
}
