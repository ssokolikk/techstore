import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { CatalogPage } from './pages/CatalogPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage'; // Добавили импорт

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} /> {/* Добавили маршрут */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;