import { Routes, Route } from 'react-router-dom';
import MenuPage from './pages/MenuPage';
import CheckoutPage from './pages/CheckoutPage';
import TrackingPage from './pages/TrackingPage';

export default function App() {
  return (
    <div className="bg-background text-on-background font-inter min-h-screen">
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/tracking/:id" element={<TrackingPage />} />
      </Routes>
    </div>
  );
}
