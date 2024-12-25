import '../styles/index.css';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex-container">
        <h1 className="text-center">Sistem Manajemen Rantai Pasokan</h1>
        <h3 className="text-center">Berbasis Blockchain</h3>
      </div>
    </>
  );
}
