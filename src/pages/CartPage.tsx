import { Container, Table, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { removeFromCart } from '../store/cartSlice';

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <Container className="mt-5 text-center py-5">
        <h3 className="fw-bold mb-3">В корзине пока пусто</h3>
        <p className="text-muted mb-4">Загляните в каталог, чтобы выбрать что-нибудь классное.</p>
        <Button as={Link as any} to="/" className="btn-custom px-4 py-2">
          Перейти в каталог
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4 fw-bold">Корзина</h2>
      
      <Card className="border-0 shadow-sm rounded-4 mb-4">
        <Card.Body className="p-4">
          <Table borderless responsive className="align-middle mb-0">
            <thead className="text-muted text-uppercase small">
              <tr>
                <th>Товар</th>
                <th>Цена</th>
                <th className="text-center">Кол-во</th>
                <th className="text-end">Сумма</th>
                <th className="text-end">Действие</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border-bottom">
                  <td className="fw-semibold py-3">{item.title}</td>
                  <td>${item.price}</td>
                  <td className="text-center">{item.quantity} шт.</td>
                  <td className="text-end fw-bold">${(item.price * item.quantity).toFixed(2)}</td>
                  <td className="text-end">
                    <Button 
                      variant="outline-danger" 
                      size="sm" 
                      className="rounded-pill px-3"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Удалить
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          
          <div className="d-flex justify-content-end align-items-center mt-4 pt-3 border-top">
            <span className="text-muted me-3 fs-5">Итого:</span>
            <span className="fw-bold fs-3 text-success">${totalPrice.toFixed(2)}</span>
          </div>
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-end">
        {/* Вот здесь кнопка ведет на страницу оформления заказа */}
        <Button as={Link as any} to="/checkout" className="btn-custom px-5 py-3 fs-5">
          Оформить заказ
        </Button>
      </div>
    </Container>
  );
};