// pages/create-production.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';

export default function CreateProduction() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    business_id: '',
    linked_productions_id: '',
    type: '',
    quantity: '',
    production_location: '',
    production_time: '',
    additional_info: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Prepare data for submission
    const dataToSubmit = {
      business_id: parseInt(formData.business_id),
      linked_productions_id: formData.linked_productions_id.split(',').map(Number),
      type: formData.type,
      quantity: parseFloat(formData.quantity),
      production_location: formData.production_location,
      production_time: new Date(formData.production_time),
      additional_info: formData.additional_info,
    };

    // Validate if all required fields are filled
    if (!dataToSubmit.business_id || !dataToSubmit.linked_productions_id || !dataToSubmit.type || !dataToSubmit.quantity || !dataToSubmit.production_location || !dataToSubmit.production_time) {
      setError('Missing required fields');
      setLoading(false);
      return;
    }

    // Show SweetAlert2 confirmation before submitting
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, create it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Send data to the backend if confirmed
          const response = await fetch('http://localhost:5000/api/productions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSubmit),
          });

          if (response.ok) {
            // Redirect to another page (success, for example)
            Swal.fire({
              title: 'Success!',
              text: 'Your production has been created.',
              icon: 'success',
            }).then(() => {
              router.push('/home'); // Redirect to success page
            });
          } else {
            // Handle API error
            const responseData = await response.json();
            setError(responseData.msg || 'An error occurred');
            Swal.fire({
              title: 'Error',
              text: responseData.msg || 'An error occurred.',
              icon: 'error',
            });
          }
        } catch (error) {
          setError('An error occurred while submitting the form.');
          Swal.fire({
            title: 'Error',
            text: 'An error occurred while submitting the form.',
            icon: 'error',
          });
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });
  };

  return (
    <>
      <Navbar />
      <Container fluid="sm" className="d-flex justify-content-center align-items-center min-vh-100" style={{ maxWidth: '600px', marginTop: '70px', backgroundColor: '#FFF8E6', padding: '20px', borderRadius: '10px' }}>
        <Row className="w-100">
          <Col>
            <h1 className="text-center mb-4">Create a New Production</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="business_id" className="mb-3">
                <Form.Label>Business ID</Form.Label>
                <Form.Control type="number" name="business_id" value={formData.business_id} onChange={handleChange} required placeholder="Enter Business ID" />
              </Form.Group>

              <Form.Group controlId="linked_productions_id" className="mb-3">
                <Form.Label>Linked Productions ID (comma separated)</Form.Label>
                <Form.Control type="text" name="linked_productions_id" value={formData.linked_productions_id} onChange={handleChange} required placeholder="Enter Linked Production IDs" />
              </Form.Group>

              <Form.Group controlId="type" className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Control as="select" name="type" value={formData.type} onChange={handleChange} required>
                  <option value="">Select Type</option>
                  <option value="FARM">Farm</option>
                  <option value="TRANSPORT">Transport</option>
                  <option value="MILL">Mill</option>
                  <option value="REFINERY">Refinery</option>
                  <option value="MANUFACTURING">Manufacturing</option>
                  {/* Add other types as needed */}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="quantity" className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number" name="quantity" value={formData.quantity} onChange={handleChange} step="any" required placeholder="Enter Quantity" />
              </Form.Group>

              <Form.Group controlId="production_location" className="mb-3">
                <Form.Label>Production Location</Form.Label>
                <Form.Control type="text" name="production_location" value={formData.production_location} onChange={handleChange} required placeholder="Enter Production Location" />
              </Form.Group>

              <Form.Group controlId="production_time" className="mb-3">
                <Form.Label>Production Time</Form.Label>
                <Form.Control type="datetime-local" name="production_time" value={formData.production_time} onChange={handleChange} required />
              </Form.Group>

              <div className="d-flex justify-content-center mt-5 mb-3">
                <Button variant="primary" type="submit" className="w-100" style={{ maxWidth: '250px' }} disabled={loading}>
                  {loading ? 'Submitting...' : 'Create Production'}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
