import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen gap-4 text-center px-4"
    >
      <p
        className="font-bold opacity-10 leading-none text-[var(--color-gray-white)]"
        style={{ fontSize: 'clamp(80px, 20vw, 160px)' }}
      >
        404
      </p>
      <h1 className="text-display-sm font-bold text-[var(--color-gray-white)]">Page not found</h1>
      <p className="text-[var(--color-gray-400)] [font-size:var(--fs-text-sm)]">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/">
        <Button size="lg" className="mt-4">
          Go Home
        </Button>
      </Link>
    </motion.div>
  );
}
