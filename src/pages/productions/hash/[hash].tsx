import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Navbar from '../../../components/Navbar';
import { Container, Card, ListGroup } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function ProductionByHash() {
  const router = useRouter();
  const { hash } = router.query;
  const [production, setProduction] = useState(null);

  useEffect(() => {
    if (!hash) return;

    const fetchProduction = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/productions/offchain/${hash}`);
        if (response.ok) {
          const data = await response.json();
          setProduction(data);
        } else {
          Swal.fire({
            icon: 'error', // Jenis ikon error
            title: 'Not Found',
            text: 'Data yang Anda cari tidak ditemukan.',
            confirmButtonText: 'OK',
          });
          router.push(`/home`);
        }
      } catch (error) {
        console.error('Error fetching production by hash:', error);
      }
    };

    fetchProduction();
  }, [hash]);

  if (!production) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <h1 className="text-center mt-5 mb-4">Data dari blockchain</h1>
      <Container className="mt-5" style={{ maxWidth: '700px' }}>
        <Card>
          <Card.Header className="text-center">Production Details (from blockchain)</Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Hash:</strong> {production.hash}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Production ID:</strong> {production.creator_id}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Timestamp:</strong> {new Date(production.timestamp * 1000).toLocaleString()}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Linked Productions IDs:</strong> {production.brought_ids && production.brought_ids.length > 0 ? production.brought_ids.join(', ') : 'None'}
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
