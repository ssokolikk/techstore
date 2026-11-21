import { useState } from 'react';
import { Container, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { create, test, enforce } from 'vest';
import ky from 'ky'; // 👈 Подключили ky

interface FormData {
  name: string;
  email: string;
  phone: string;
}

const suite = create((data: FormData) => {
  test('name', 'Имя обязательно для заполнения', () => {
    enforce(data.name).isNotBlank();
  });

  test('email', 'Введите корректный email', () => {
    enforce(data.email).isNotBlank().matches(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
  });

  test('phone', 'Телефон обязателен', () => {
    enforce(data.phone).isNotBlank();
  });
});

export const CheckoutPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false); // Состояние отправки

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    
    const result = suite.run(newData);
    const currentErrors = result.getErrors();
    setErrors({ ...errors, [name]: currentErrors[name as keyof FormData]?.[0] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = suite.run(formData);
    
    if (result.hasErrors()) {
      const allErrors = result.getErrors();
      const formattedErrors: Partial<FormData> = {};
      
      (Object.keys(allErrors) as Array<keyof FormData>).forEach((key) => {
        formattedErrors[key] = allErrors[key]?.[0];
      });
      
      setErrors(formattedErrors);
      return;
    }

    // 👇 Имитируем отправку заказа через ky
    setIsSending(true);
    try {
      await ky.post('https://dummyjson.com/products/add', {
        json: {
          title: 'Новый заказ TechStore',
          userId: 1,
          customer: formData
        }
      });
      
      // Если отправка прошла успешно
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 4000);
    } catch (error) {
      alert('Ошибка при отправке заказа. Попробуйте еще раз.');
    } finally {
      setIsSending(false);
    }
  };

  if (isSuccess) {
    return (
      <Container className="mt-5 text-center py-5">
        <Alert variant="success" className="p-5 rounded-4 shadow-sm">
          <h2 className="fw-bold mb-3">Заказ успешно оформлен! 🎉</h2>
          <p className="fs-5">Спасибо за покупку. Мы свяжемся с вами в ближайшее время.</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4 fw-bold">Оформление заказа</h2>
      <Card className="border-0 shadow-sm rounded-4">
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Ваше имя</Form.Label>
              <Form.Control 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                isInvalid={!!errors.name}
                placeholder="Иван Иванов"
                disabled={isSending}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                isInvalid={!!errors.email}
                placeholder="ivan@example.com"
                disabled={isSending}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Телефон</Form.Label>
              <Form.Control 
                type="text" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                isInvalid={!!errors.phone}
                placeholder="+7 (999) 123-45-67"
                disabled={isSending}
              />
              <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" className="btn-custom w-100 py-3 fs-5" disabled={isSending}>
              {isSending ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Отправка...
                </>
              ) : (
                'Подтвердить заказ'
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};