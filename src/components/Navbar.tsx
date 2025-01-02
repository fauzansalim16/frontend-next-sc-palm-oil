import { useRouter } from 'next/router'; // Import useRouter dari Next.js
import Link from 'next/link';
import '../styles/navbar.css';

export default function Navbar() {
  const router = useRouter();
  const isHomePage = router.pathname === '/home';

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link href="/home">Home</Link>
        </li>
        <li className="navbar-item">
          <Link href="/about">About</Link>
        </li>
        <li className="navbar-item">
          <Link href="/profile">Profile</Link>
        </li>
        <li className="navbar-item">
          <Link href="/login">Logout</Link>
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
