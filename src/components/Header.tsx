import { Navbar, Container, Nav, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

export const Header = () => {
  // Достаем товары из корзины Redux, чтобы посчитать их количество
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">TechStore</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Каталог</Nav.Link>
            <Nav.Link as={Link} to="/cart">
              Корзина 
              {/* Если товаров больше 0, показываем красный кружок с цифрой */}
              {totalQuantity > 0 && (
                <Badge bg="danger" pill className="ms-2">
                  {totalQuantity}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};