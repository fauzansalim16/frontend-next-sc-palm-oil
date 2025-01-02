import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import { User } from 'lucide-react';

export default function CreateUser() {
  // State untuk menyimpan data form
  const [username, setUsername] = useState('');
  const [roleId, setRoleId] = useState(1);
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Handle submit form
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Membuat objek data user
    const userData = {
      username,
      role_id: roleId,
      password,
    };

    // Logika pengiriman data ke API
    console.log('Data User yang akan dibuat:', userData);

    try {
      // Mengirim data ke API
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), // Mengirim data dalam format JSON
      });

      // Mengecek apakah pengiriman data berhasil
      if (response.ok) {
        const data = await response.json();
        console.log('User Created:', data);
        router.push('/profile');
      } else {
        console.error('Error creating user:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Navbar />
      <Container className="shadow-lg p-4 rounded" style={{ maxWidth: '450px', backgroundColor: '#FFF8E6', padding: '20px', borderRadius: '10px', marginBottom: '200px', marginTop: '90px' }}>
        <div className="d-flex align-items-center mb-3 mt-3 me-3">
          <User size={40} className="text-center mb-2" />
          <h2>Create New User</h2>
        </div>
        <Form onSubmit={handleSubmit}>
          {/* Input untuk username */}
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>

          {/* Input untuk password */}
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          {/* Input untuk role_id */}
          <Form.Group className="mb-3" controlId="formRoleId">
            <Form.Label>Role</Form.Label>
            <Form.Control style={{ width: '110px' }} as="select" value={roleId} onChange={(e) => setRoleId(Number(e.target.value))}>
              <option value={1}>Owner</option>
              <option value={2}>Transporter</option>
              <option value={3}>Farmer</option>
              <option value={4}>Miller</option>
              <option value={5}>Refiner</option>
              {/* Tambahkan pilihan role lain sesuai kebutuhan */}
            </Form.Control>
          </Form.Group>

          {/* Tombol Submit */}
          <div className="d-flex justify-content-center mt-5">
            <Button className="mb-4" type="submit" style={{ backgroundColor: '#AB4459', border: 'none' }}>
              Create User
            </Button>{' '}
          </div>
        </Form>
      </Container>
    </>
  );
}
