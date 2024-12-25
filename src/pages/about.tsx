import Navbar from '@/components/Navbar';
import '../styles/index.css';

function About() {
  return (
    <>
      <Navbar />
      <div className="flex-container">
        <h1 className="text-center mt-5">Welcome to My Next.js App</h1>
        <p className="lead text-center">This is a simple page using React-Bootstrap in Next.js</p>
      </div>
    </>
  );
}

export default About;
