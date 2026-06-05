import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, Tv, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { useFavoriteCount } from '../store/movieStore';

// Navlink
const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/favorites', label: 'Favorites', end: false },
] as const;

// Header
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const favoriteCount = useFavoriteCount();
  const navigate = useNavigate();

  // Detect scroll to apply glass effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  const closeMobile = () => setMobileOpen(false);

  const navLinks = [
    { to: '/', label: 'Home', end: true },
    { to: '/favorites', label: 'Favorites' },
  ];

  return (
    <header className={cn('site-header', scrolled && 'site-header--scrolled')}>
      <nav className="site-header__inner">
        {/* Logo */}
        <Link to="/" className="logo flex-shrink-0">
          <div className="logo__icon">
            <Tv size={20} aria-hidden="true" />
          </div>
          <span className="logo__text">Movie</span>
        </Link>

        {/* Nav Links  */}
        <div className="hidden md:flex items-center gap-1 flex-1 pl-[var(--space-10)]">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => cn('nav-link', isActive && 'nav-link--active')}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right: Search + Favorites */}
        <div className="hidden md:flex items-center gap-[var(--space-3)]">
          {/* Favorites badge */}
          <Link
            to="/favorites"
            className="relative p-2 text-[var(--color-gray-white)] hover:text-[var(--color-brand-red)] transition-colors"
            aria-label={`Favorites — ${favoriteCount} saved`}
          >
            <Heart size={20} />
            <AnimatePresence>
              {favoriteCount > 0 && (
                <motion.span
                  key={favoriteCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className={[
                    'absolute -top-0.5 -right-0.5',
                    'min-w-[18px] h-[18px] px-1',
                    'bg-[var(--color-brand-red)] text-[var(--color-gray-white)]',
                    'text-[10px] font-bold',
                    'rounded-[var(--radius-full)]',
                    'flex items-center justify-center',
                  ].join(' ')}
                >
                  {favoriteCount > 99 ? '99+' : favoriteCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Search trigger pill */}
          <button
            type="button"
            onClick={() => navigate('/search')}
            className={[
              'search-bar search-bar--sm',
              'min-w-[180px] cursor-pointer',
              'text-left',
            ].join(' ')}
            aria-label="Open search"
          >
            <Search
              size={15}
              className="text-[var(--color-gray-500)] flex-shrink-0"
              aria-hidden="true"
            />
            <span className="[font-family:var(--font-poppins)] [font-size:var(--fs-text-sm)] text-[var(--color-gray-500)]">
              Search Movie
            </span>
          </button>
        </div>

        {/* Mobile Hamburger  */}
        <button
          type="button"
          className="md:hidden p-2 text-[var(--color-gray-white)]"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="block"
              >
                <X size={22} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="block"
              >
                <Menu size={22} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/*  Mobile Drawer  */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-b border-[var(--color-gray-800)]"
            style={{
              background: 'rgba(0, 0, 0, 0.96)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="px-[var(--space-6)] py-[var(--space-4)] flex flex-col gap-[var(--space-2)]">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  onClick={closeMobile}
                  className={({ isActive }) => cn('nav-link', isActive && 'nav-link--active')}
                >
                  {link.label}
                </NavLink>
              ))}

              {/* Search shortcut */}
              <button
                type="button"
                onClick={() => {
                  navigate('/search');
                  closeMobile();
                }}
                className="nav-link text-left flex items-center gap-[var(--space-2)]"
              >
                <Search size={16} aria-hidden="true" />
                Search
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}