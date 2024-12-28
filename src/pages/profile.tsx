import { useState, useEffect } from 'react';
import { Button, Table, Container, Row, Col, Card } from 'react-bootstrap';
import Swal from 'sweetalert2'; // Mengimpor SweetAlert2
import Navbar from '../components/Navbar';
import Link from 'next/link';

function Profile() {
  const [user, setUser] = useState({
    id: 1,
    username: 'loading...',
    role: 'loading...',
    created_at: 'loading...',
    public_key: 'loading...',
  });

  const [users, setUsers] = useState([]);

  // Ambil data profile pengguna dengan id = 1
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/1');
        if (response.ok) {
          const data = await response.json();
          setUser({
            id: data.id,
            username: data.username,
            role: data.role.name,
            created_at: new Date(data.created_at).toLocaleString(),
            public_key: data.public_key,
          });
        } else {
          console.error('Error fetching user data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUser();
  }, []);

  // Ambil daftar semua pengguna
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users');
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error('Error fetching users data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUsers();
  }, []);

  // Fungsi untuk menghapus user dengan konfirmasi SweetAlert2
  const handleDelete = async (id: any) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Mengirimkan request DELETE ke API untuk menghapus pengguna
          const response = await fetch(`http://localhost:5000/api/users/${id}`, {
            method: 'DELETE',
            // headers: {
            //   'Authorization': `Bearer ${token}`,
            // },
          });

          if (response.ok) {
            // Menghapus user dari daftar pengguna
            const updatedUsers = users.filter((user) => user.id !== id);
            setUsers(updatedUsers);

            Swal.fire({
              title: 'Deleted!',
              text: 'User has been deleted.',
              icon: 'success',
            });
          } else {
            // Menangani jika ada error saat penghapusan
            Swal.fire({
              title: 'Error!',
              text: 'There was a problem deleting the user.',
              icon: 'error',
            });
          }
        } catch (error) {
          console.error('Error deleting user:', error);
          Swal.fire({
            title: 'Error!',
            text: 'There was a problem deleting the user.',
            icon: 'error',
          });
        }
      }
    });
  };

  return (
    <>
      <Navbar />
      <Container fluid className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        {/* Profile Info */}
        <Card className="mb-4 mt-5 bg-light" style={{ width: '600px' }}>
          <Card.Body>
            <Card.Title>
              <h1 className="text-center mb-5">My Profile</h1>
            </Card.Title>
            <Row>
              <Col sm={4}>
                <Card.Text>
                  <strong>User ID:</strong> {user.id}
                </Card.Text>
                <Card.Text>
                  <strong>Username:</strong> {user.username}
                </Card.Text>
                <Card.Text>
                  <strong>Role:</strong> {user.role}
                </Card.Text>
              </Col>
              <Col xs={12} sm={8}>
                <Card.Text>
                  <strong>Created At:</strong> {user.created_at}
                </Card.Text>
                <Card.Text>
                  <strong>Public Key:</strong> {user.public_key}
                </Card.Text>
              </Col>
            </Row>
            <div className="d-flex justify-content-center mt-5 mb-2">
              <Link href="/create-user">
                <Button type="submit" style={{ backgroundColor: '#AB4459', border: 'none' }}>
                  Create User
                </Button>{' '}
              </Link>
            </div>
          </Card.Body>
        </Card>

        {/* User Table */}
        <h3 className="mb-3 mt-3">User List</h3>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Public Key</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.role.name}</td>
                <td>{new Date(user.created_at).toLocaleString()}</td>
                <td style={{ maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.public_key}</td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(user.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Profile;
