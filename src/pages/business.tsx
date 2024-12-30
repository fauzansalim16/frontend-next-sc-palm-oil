import Navbar from '@/components/Navbar';
import '../styles/index.css';
import { Table, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

export default function Business() {
  const [businesses, setBusinesses] = useState([]);
  const [formData, setFormData] = useState({
    owner_id: '',
    name: '',
    type: '',
    created_at: '',
    additional_info: '',
    location: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Fetch data from API or server
    // Replace with your API endpoint
    fetch('http://localhost:5000/api/businesses')
      .then((response) => response.json())
      .then((data) => setBusinesses(data))
      .catch((error) => console.error('Error fetching businesses:', error));
  }, []);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    const dataToSubmit = { ...formData };

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
          const response = await fetch('http://localhost:5000/api/businesses', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSubmit),
          });

          if (response.ok) {
            const newBusiness = await response.json();
            setBusinesses([...businesses, newBusiness]);
            Swal.fire({
              title: 'Success!',
              text: 'Your business has been created.',
              icon: 'success',
            }).then(() => {
              setFormData({
                owner_id: '',
                name: '',
                type: '',
                created_at: '',
                additional_info: '',
                location: '',
              });
            });
          } else {
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

      <div className="container mt-4 d-flex flex-column align-items-center">
        <h1>Business Management</h1>

        {/* Business Table */}
        <Table striped bordered hover style={{ maxWidth: '1000px' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Owner ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Created At</th>
              <th>Additional Info</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {businesses.map((business) => (
              <tr key={business.id}>
                <td>{business.id}</td>
                <td>{business.user.username}</td>
                <td>{business.name}</td>
                <td>{business.type}</td>
                <td>{business.created_at}</td>
                <td>{business.additional_info}</td>
                <td>{business.location}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Create Business Form */}
        <h2>Create New Business</h2>
        <Form onSubmit={handleSubmit} className="mb-5 mt-4" style={{ width: '500px', backgroundColor: '#FFF8E6', padding: '20px', borderRadius: '10px' }}>
          <Form.Group className="mb-3">
            <Form.Label>Owner ID</Form.Label>
            <Form.Control type="text" name="owner_id" value={formData.owner_id} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3" style={{ width: '170px' }}>
            <Form.Label>Created At</Form.Label>
            <Form.Control type="datetime-local" name="created_at" value={formData.created_at} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Additional Info</Form.Label>
            <Form.Control type="text" name="additional_info" value={formData.additional_info} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3" style={{ width: '130px' }}>
            <Form.Label>Type</Form.Label>
            <Form.Control as="select" name="type" value={formData.type} onChange={handleChange} required>
              <option value="">Select Type</option>
              <option value="FARM">Farm</option>
              <option value="TRANSPORT">Transport</option>
              <option value="MILL">Mill</option>
              <option value="REFINERY">Refinery</option>
              <option value="MANUFACTURING">Manufacturing</option>
            </Form.Control>
          </Form.Group>

          <div className="d-flex justify-content-center mt-4 mb-3">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Create Business'}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
