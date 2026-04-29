import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    try {
      await register(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4">
      <div className="bg-white p-8 rounded-xl shadow-[0_8px_24px_rgba(45,49,66,0.12)] w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black tracking-tighter text-orange-600 mb-2">FreshBites</h1>
          <h2 className="text-xl font-h3 text-on-surface">Create an Account</h2>
          <p className="text-body-md text-on-surface-variant mt-2">Join us to start ordering</p>
        </div>

        {error && (
          <div className="bg-error-container text-error text-label-md p-3 rounded-lg mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-label-md text-on-surface-variant mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full border border-outline-variant rounded-lg px-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-label-md text-on-surface-variant mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full border border-outline-variant rounded-lg px-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-label-md text-on-surface-variant mb-1">Confirm Password</label>
            <input
              type="password"
              required
              className="w-full border border-outline-variant rounded-lg px-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white font-label-md py-3 rounded-lg hover:bg-orange-700 transition-colors mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="text-center text-body-md text-on-surface-variant mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-label-md hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
