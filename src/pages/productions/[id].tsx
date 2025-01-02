import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, ListGroup, Container, Button, Form, Row, Col } from 'react-bootstrap';
import Navbar from '../../components/Navbar';

export default function ProductionDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [production, setProduction] = useState(null);
  const [offchainHash, setOffchainHash] = useState('');
  const [txHash, setTxHash] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchProduction = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/productions/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduction(data);
        } else {
          console.error('Failed to fetch production details');
        }
      } catch (error) {
        console.error('Error fetching production details:', error);
      }
    };

    fetchProduction();
  }, [id]);

  // Fungsi untuk menangani pencarian
  const handleSearch = (e) => {
    e.preventDefault();
    if (offchainHash && txHash) {
      router.push(`/productions/hash/${offchainHash}?txHash=${txHash}`);
    }
  };

  if (!production) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <Container className="mt-5 mb-5" style={{ maxWidth: '700px' }}>
        <div className="mt-5 mb-4">
          <Form onSubmit={handleSearch}>
            <Row className="mb-3">
              <Col>
                <Form.Control type="text" placeholder="Enter Production Hash" value={offchainHash} onChange={(e) => setOffchainHash(e.target.value)} />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Control type="text" placeholder="Enter Transaction Hash" value={txHash} onChange={(e) => setTxHash(e.target.value)} />
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="d-flex justify-content-center">
                  <Button
                    type="submit"
                    style={{
                      backgroundColor: '#AB4459',
                      border: 'none',
                      width: '20%',
                    }}
                  >
                    Search
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
        <Card className="shadow-lg p-4 rounded" style={{ marginBottom: '200px' }}>
          <Card.Header className="text-center">
            <strong>Production Details</strong>
          </Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>ID:</strong> {production.id}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Type:</strong> {production.type}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Business:</strong> {production.business.name} ({production.business.type})
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>User:</strong> {production.user.username}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Location:</strong> {production.production_location}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Production Time:</strong>{' '}
                {new Date(production.production_time).toLocaleString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Additional Info:</strong>
                {production.additional_info ? (
                  <ul>
                    {Object.entries(JSON.parse(production.additional_info)).map(([key, value]) => (
                      <li key={key}>
                        <strong>{key.replace('_', ' ').toUpperCase()}:</strong> {value}
                      </li>
                    ))}
                  </ul>
                ) : (
                  'None'
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Hash:</strong> {production.hash}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Linked Productions ID:</strong> {production.linked_productions_id.join(', ')}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Created At:</strong> {new Date(production.created_at).toLocaleString()}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Details:</strong>
                <ul>
                  {production.production_details.map((detail) => (
                    <li key={detail.id}>
                      <strong>ID:</strong> {detail.id} |<strong> Created At:</strong> {new Date(detail.created_at).toLocaleString()} |<strong> Linked ID:</strong> {detail.linked_productions_id} |<strong> Info:</strong>{' '}
                      {detail.additional_info || 'None'}
                    </li>
                  ))}
                </ul>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
