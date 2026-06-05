import './index.css';
import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools }  from '@tanstack/react-query-devtools'
import { AnimatePresence }from 'framer-motion'
import { queryClient }from './lib/queryClient'
import { Header }from './components/Header'
import { ToastProvider }from './components/Toastprovider'
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingSpinner }from './components/ErrorState'

const HomePage= lazy(() => import('./pages/HomePage'))
const MovieDetailPage= lazy(() => import('./pages/MovieDetailPage'))
const SearchPage= lazy(() => import('./pages/SearchPage'))
const FavoritesPage= lazy(() => import('./pages/FavoritePage'))
const NotFoundPage= lazy(() => import('@/pages/NotFoundPage'))
 
function AppRoutes() {
  const location = useLocation()
 
  return (
    <>
      <Header />
      <main style={{ paddingTop: 'var(--header-h-d)' }}>
        <Suspense fallback={<LoadingSpinner size={36} />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/movie/:id" element={<MovieDetailPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
    </>
  );
}

// Root App 
export default function App() {
  return (
 <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ToastProvider>
 
      {import.meta.env.DEV && (
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      )}
    </QueryClientProvider>
  </ErrorBoundary>
  )
}