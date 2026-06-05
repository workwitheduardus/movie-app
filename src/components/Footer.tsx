import { Link } from 'react-router-dom';
import { Tv } from 'lucide-react';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <Link to="/" className="logo">
          <div className="logo__icon">
            <Tv size={20} aria-hidden="true" />
          </div>
          <span className="logo__text">Movie</span>
        </Link>
        <p className="site-footer__copy">Eduardus Copyright ©2026 Movie Explorer</p>
      </div>
    </footer>
  );
}
