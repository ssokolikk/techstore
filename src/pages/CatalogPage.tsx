import { useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert, Card, Button } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProducts } from '../store/productsSlice';
import { addToCart } from '../store/cartSlice';

export const CatalogPage = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="dark" />
        <p className="mt-3 fw-bold">Загрузка витрины...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">Ошибка: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4 fw-bold">Каталог смартфонов</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {items.map((product) => (
          <Col key={product.id}>
            {/* Добавили className="product-card" */}
            <Card className="h-100 product-card"> 
              <Card.Img 
                variant="top" 
                src={product.thumbnail} 
                style={{ height: '250px', objectFit: 'contain', padding: '20px' }} 
              />
              <Card.Body className="d-flex flex-column p-4">
                <Card.Title className="fw-bold fs-5">{product.title}</Card.Title>
                <Card.Text className="text-muted small mb-3">
                  {product.category}
                </Card.Text>
                <Card.Text className="fw-bolder fs-4 mt-auto mb-3">
                  ${product.price}
                </Card.Text>
                <Button 
                  className="w-100 btn-custom py-2" /* Добавили btn-custom */
                  onClick={() => dispatch(addToCart(product))}
                >
                  Добавить в корзину
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};