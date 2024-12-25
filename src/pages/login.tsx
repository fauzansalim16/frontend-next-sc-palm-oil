import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Swal from 'sweetalert2';

export default function Login() {
  const handleSubmit = (e: any) => {
    e.preventDefault(); // Mencegah form submit default behavior
    Swal.fire({
      title: 'Login berhasil!',
      icon: 'success',
    });
  };
  return (
    <>
      <h1 className="text-center mt-5">Welcome to Sistem Manajemen</h1>
      <Container style={{ maxWidth: '400px', marginTop: '50px', backgroundColor: '#FFF8E6', padding: '20px', borderRadius: '10px' }}>
        <h2 className="text-center mt-3 mb-5">Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" />
          </Form.Group>
          <Form.Group className="mb-5" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <div className="mt-3 mb-4" style={{ display: 'flex', justifyContent: 'center' }}>
            <Button style={{ backgroundColor: '#AB4459', border: 'none' }} variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}
