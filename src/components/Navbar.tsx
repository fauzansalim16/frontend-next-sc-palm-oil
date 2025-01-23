import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import '../styles/navbar.css';

export default function Navbar() {
  const router = useRouter();
  const isHomePage = router.pathname === '/home';
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(Cookies.get('token') || null);
  }, []);

  const handleLogout = () => {
    Cookies.remove('token'); // Hapus token
    router.push('/login'); // Arahkan ke halaman login
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link href="/home">Home</Link>
        </li>
        <li className="navbar-item">
          <Link href="/business">Business</Link>
        </li>
        <li className="navbar-item">
          <Link href="/profile">Profile</Link>
        </li>
        <li className="navbar-item">
          {token ? (
            <a href="#" onClick={handleLogout}>
              Logout
            </a>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </li>
        {isHomePage && (
          <li className="navbar-item create-productions ms-1">
            <Link href="/create-production">Create Productions</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
