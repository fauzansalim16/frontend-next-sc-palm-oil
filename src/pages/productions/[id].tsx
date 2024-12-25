// pages/productions/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, ListGroup, Container } from 'react-bootstrap';
import Navbar from '../../components/Navbar';

export default function ProductionDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [production, setProduction] = useState(null);

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

  if (!production) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <Container className="mt-5">
        <Card>
          <Card.Header>Production Details</Card.Header>
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
                <strong>Production Time:</strong> {new Date(production.production_time).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Additional Info:</strong> {production.additional_info || 'None'}
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
