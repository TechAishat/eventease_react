import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore.js';
import { useToast } from '../hooks/useToast.js';

const defaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const Signup = () => {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const register = useAuthStore((state) => state.register);
  const session = useAuthStore((state) => state.getSession());
  const { showError, showSuccess } = useToast();
  const navigate = useNavigate();

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

    if (!values.name.trim()) {
      nextErrors.name = 'Name is required.';
    }

    if (!values.email.trim()) {
      nextErrors.email = 'Email is required.';
    }

    if (!values.password) {
      nextErrors.password = 'Password is required.';
    } else if (values.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.';
    }

    if (!values.confirmPassword) {
      nextErrors.confirmPassword = 'Confirm your password.';
    } else if (values.confirmPassword !== values.password) {
      nextErrors.confirmPassword = 'Passwords do not match.';
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
      await register({
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password
      });
      showSuccess('Account created', 'Welcome aboard! You are now signed in.');
      navigate('/dashboard', { replace: true });
    } catch (error) {
      showError('Signup failed', error.message ?? 'Unable to create account.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-shell">
      <div className="form-card" role="form" aria-labelledby="signup-title">
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          <span className="tag tag-in_progress" style={{ justifySelf: 'flex-start' }}>
            Start your journey
          </span>
          <h1 id="signup-title">Create an EventEase account</h1>
          <p style={{ color: '#4a5272' }}>Organize tickets with clarity and speed.</p>
        </div>
        <form className="form-grid" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="signup-name">Full name *</label>
            <input
              id="signup-name"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              className={errors.name ? 'input-error' : ''}
              required
              autoComplete="name"
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="signup-email">Email *</label>
            <input
              id="signup-email"
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
            <label htmlFor="signup-password">Password *</label>
            <input
              id="signup-password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
              required
              autoComplete="new-password"
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="signup-confirm">Confirm password *</label>
            <input
              id="signup-confirm"
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'input-error' : ''}
              required
            />
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="btn" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account…' : 'Create account'}
          </button>
        </form>
        <p className="auth-switch">
          Already have an account? <Link to="/auth/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
