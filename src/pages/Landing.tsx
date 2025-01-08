import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Application</h1>
        <Link to="/login">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
