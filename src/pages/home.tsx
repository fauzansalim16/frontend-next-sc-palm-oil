import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Ditambahkan untuk navigasi ke halaman lain
import { Button, Table, Form, Container, Row, Col } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Swal from 'sweetalert2';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [productions, setProductions] = useState([]);
  const router = useRouter(); // Ditambahkan untuk navigasi ke halaman lain

  // Fetch data dari API saat komponen di-mount
  useEffect(() => {
    const fetchProductions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/productions');
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
    e.preventDefault();
    const matchedProduction = productions.find((production) => production.id.toString() === searchQuery);

    if (matchedProduction) {
      router.push(`/productions/${matchedProduction.id}`);
    } else {
      Swal.fire({
        icon: 'error', // Jenis ikon error
        title: 'Not Found',
        text: 'Data yang Anda cari tidak ditemukan.',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleRowClick = (id: any) => {
    router.push(`/productions/${id}`); // Navigasi ke halaman detail berdasarkan ID baris
  };

  return (
    <>
      <Navbar />
      <Container fluid className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        {/* Search Bar */}
        <div className="mt-5 mb-4">
          <Form onSubmit={handleSearch}>
            {' '}
            <Row>
              <Col xs="auto">
                <Form.Control type="text" placeholder="Search by ID" className="mr-sm-2" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '350px' }} />
              </Col>
              <Col xs="auto">
                <Button
                  type="submit"
                  style={{
                    backgroundColor: '#AB4459',
                    border: 'none',
                  }}
                >
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </div>

        {/* Tabel Data */}
        <div className="mt-4">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Source ID</th>
                <th className="text-center">Type</th>
                <th>Quantity</th>
                <th className="text-center">Hash</th>
                <th>Lokasi Produksi</th>
                <th>Waktu Produksi</th>
              </tr>
            </thead>
            <tbody>
              {productions.map((production) => (
                <tr key={production.id} onClick={() => handleRowClick(production.id)} style={{ cursor: 'pointer' }}>
                  {' '}
                  <td>{production.id}</td>
                  <td>{production.linked_productions_id.join(', ')}</td>
                  <td>{production.type}</td>
                  <td>{production.quantity}</td>
                  <td>{production.hash}</td>
                  <td>{production.production_location}</td>
                  <td>{new Date(production.production_time).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
}

export default Home;
