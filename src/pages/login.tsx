import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Swal from 'sweetalert2';
import { LogIn, Lock, WholeWord } from 'lucide-react';

export default function Login() {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    Swal.fire({
      title: 'Login berhasil!',
      icon: 'success',
    });
  };
  return (
    <>
      <h1 className="text-center mt-5">Welcome!</h1>
      <Container className="shadow-lg p-4" style={{ maxWidth: '400px', marginTop: '50px', marginBottom: '200px', backgroundColor: '#FFF8E6', padding: '20px', borderRadius: '15px' }}>
        <div className="d-flex align-items-center justify-content-center mb-5 mt-3">
          <LogIn className="me-2" />
          <h3 className="mb-0">Login</h3>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <WholeWord size={20} className="m-1" />

            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" />
          </Form.Group>
          <Form.Group className="mb-5" controlId="formBasicPassword">
            <div>
              <Lock size={20} className="me-1" />
              <Form.Label>Password</Form.Label>
            </div>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <div className="mt-3 mb-4" style={{ display: 'flex', justifyContent: 'center' }}>
            <Button style={{ backgroundColor: '#AB4459', border: 'none' }} variant="primary" type="submit">
              Login
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}
