import { FormEvent, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
  const { user, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (user) {
    return <Navigate to="/" replace />;
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password);
    } catch (err: unknown) {
      const message =
        typeof err === 'object' && err && 'response' in err
          ? (err as { response?: { data?: { error?: string } } }).response?.data?.error
          : undefined;
      setError(message || 'Unable to sign in');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth">
      <h1 className="logo">NETFLIX-CLONE</h1>
      <form className="auth__card" onSubmit={onSubmit}>
        <h2>Sign In</h2>
        {error && <p className="auth__error">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={submitting}>
          {submitting ? 'Signing in…' : 'Sign In'}
        </button>
        <p className="auth__switch">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
