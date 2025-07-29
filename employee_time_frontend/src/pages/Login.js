import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';

// PUBLIC_INTERFACE
const Login = () => {
  const { login, signup } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    if (!form.email || !form.password) {
      setError('Email and password required.');
      setSubmitting(false);
      return;
    }
    let err;
    if (isSignup) {
      err = await signup(form.email, form.password);
      if (!err) navigate('/');
    } else {
      err = await login(form.email, form.password);
      if (!err) navigate('/');
    }
    if (err) setError(err.message);
    setSubmitting(false);
  };

  return (
    <div className="etp-page-centered" style={{minHeight: '100vh', background:'#f1f4fa'}}>
      <form className="etp-card etp-form" onSubmit={handleSubmit} autoComplete="on">
        <h2 className="etp-title">{isSignup ? 'Sign Up' : 'Login'}</h2>
        <div className="etp-desc">
          {isSignup ? "Create a new account to begin tracking your hours." : "Log in to your account."}
        </div>
        {error && <div style={{color:'#e74c3c'}}>{error}</div>}
        <label htmlFor="etp-email">Email</label>
        <input
          id="etp-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="your@email.com"
          value={form.email}
          onChange={handleChange}
          required
          disabled={submitting}
        />
        <label htmlFor="etp-password">Password</label>
        <input
          id="etp-password"
          name="password"
          type="password"
          autoComplete={isSignup ? "new-password" : "current-password"}
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          disabled={submitting}
          minLength={6}
        />
        <button className="etp-btn" type="submit" disabled={submitting}>
          {submitting ? (isSignup ? 'Signing up...' : 'Logging in...') : (isSignup ? 'Sign Up' : 'Log In')}
        </button>
        <button
          className="etp-link-btn"
          type="button"
          onClick={() => { setIsSignup(s => !s); setError(''); }}
        >
          {isSignup ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
        </button>
      </form>
    </div>
  );
};

export default Login;
