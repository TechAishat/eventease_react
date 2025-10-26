import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore.js';
import { useToast } from '../hooks/useToast.js';

const defaultValues = {
  email: '',
  password: ''
};

const Login = () => {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const login = useAuthStore((state) => state.login);
  const session = useAuthStore((state) => state.getSession());
  const { showError, showSuccess } = useToast();

  const location = useLocation();
  const navigate = useNavigate();

  const redirectPath = useMemo(() => location.state?.from?.pathname || '/dashboard', [location]);

  useEffect(() => {
    if (session) {
      navigate('/dashboard', { replace: true });
    }
  }, [session, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!values.email.trim()) {
      nextErrors.email = 'Email is required.';
    }
    if (!values.password.trim()) {
      nextErrors.password = 'Password is required.';
    }
    setErrors(nextErrors);
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) return;

    try {
      setIsSubmitting(true);
      await login({ email: values.email.trim(), password: values.password });
      showSuccess('Welcome back 👋', 'You are now signed in.');
      navigate(redirectPath, { replace: true });
    } catch (error) {
      showError('Login failed', error.message ?? 'Invalid credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-shell">
      <div className="form-card" role="form" aria-labelledby="login-title">
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          <span className="tag tag-open" style={{ justifySelf: 'flex-start' }}>
            Access Portal
          </span>
          <h1 id="login-title">Login to EventEase</h1>
          <p style={{ color: '#4a5272' }}>Manage every ticket with confidence.</p>
        </div>
        <form className="form-grid" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="login-email">Email *</label>
            <input
              id="login-email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
              required
              autoComplete="email"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="login-password">Password *</label>
            <input
              id="login-password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
              required
              autoComplete="current-password"
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <button type="submit" className="btn" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <p className="auth-switch">
          New to EventEase? <Link to="/auth/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
