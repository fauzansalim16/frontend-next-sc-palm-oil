// pages/index.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Table, Form, Button, Container, Row, Col } from 'react-bootstrap';
import Navbar from '../components/Navbar';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [productions, setProductions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProductions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/productions', {
          // headers: {
          //   'Authorization': `Bearer ${token}`,
          // },
        });
        if (response.ok) {
          const data = await response.json();
          setProductions(data);
        } else {
          console.error('Failed to fetch productions');
        }
      } catch (error) {
        console.error('Error fetching productions:', error);
      }
    };

    fetchProductions();
  }, []);

  const handleSearch = (e: any) => {
    e.preventDefault(); // Ditambahkan untuk mencegah reload halaman saat submit
    const matchedProduction = productions.find((production) => production.id.toString() === searchQuery);

    if (matchedProduction) {
      router.push(`/productions/${matchedProduction.id}`); // Navigasi ke halaman produk berdasarkan ID
    } else {
      alert('Not Found'); // Menampilkan alert jika data tidak ditemukan
    }
  };

  return (
    <>
      <Navbar />
      <Container fluid className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        {' '}
        <div className="mb-5" style={{ marginTop: '100px' }}>
          <Form onSubmit={handleSearch}>
            {' '}
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Search by ID"
                  className="mr-sm-2"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} // Tetap hanya mengubah nilai query
                  style={{ width: '350px' }}
                />
              </Col>
              <Col xs="auto">
                <Button
                  type="submit"
                  style={{
                    backgroundColor: '#AB4459',
                    border: 'none',
                  }}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
        <Table className="mt-4" striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Source ID</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Hash</th>
              <th>Lokasi Produksi</th>
              <th>Waktu Produksi</th>
            </tr>
          </thead>
          <tbody>
            {productions
              .filter((production) => production.business_id.toString().includes(searchQuery))
              .map((production) => (
                <tr key={production.id} onClick={() => router.push(`/productions/${production.id}`)} style={{ cursor: 'pointer' }}>
                  <td>{production.id}</td>
                  <td>{production.linked_productions_id.join(', ')}</td>
                  <td>{production.type}</td>
                  <td>{production.quantity}</td>
                  <td>{production.hash}</td>
                  <td>{production.production_location}</td>
                  <td>{new Date(production.production_time).toLocaleString()}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
