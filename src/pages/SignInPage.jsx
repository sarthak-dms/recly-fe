import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackdropMosaic from '../components/BackdropMosaic';
import { useAuth } from '../context/AuthContext';

const SignInPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, signIn } = useAuth();
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    remember: true,
  });
  const [message, setMessage] = useState(location.state?.message || '');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate(location.state?.from === '/signin' ? '/' : location.state?.from || '/recruiters', {
        replace: true,
      });
    }
  }, [isAuthenticated, location.state, navigate]);

  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage('');
    setMessage('');

    const result = signIn(formValues);

    if (!result.ok) {
      setErrorMessage(result.error);
      return;
    }

    navigate(location.state?.from === '/signin' ? '/' : location.state?.from || '/recruiters', {
      replace: true,
    });
  };

  return (
    <div className="marketing-page marketing-page--signin">
      <BackdropMosaic />

      <section className="signin-hero">
        <div className="signin-card">
          <h1>Sign In</h1>
          <p className="signin-card__subtitle">
            Sign in with an admin account configured in your environment to access recruiter data.
          </p>

          <form className="signin-form" onSubmit={handleSubmit}>
            <label className="signin-form__field">
              <span>Email or phone number</span>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formValues.email}
                onChange={handleInputChange}
              />
            </label>

            <label className="signin-form__field">
              <span>Password</span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleInputChange}
              />
            </label>

            <button type="submit" className="signin-form__submit">
              Sign In
            </button>

            <button type="button" className="signin-form__secondary">
              Use a sign-in code
            </button>
          </form>

          <div className="signin-card__footer">
            <label className="signin-card__remember">
              <input
                type="checkbox"
                name="remember"
                checked={formValues.remember}
                onChange={handleInputChange}
              />
              <span>Remember me</span>
            </label>
            <button type="button" className="signin-card__link">
              Admin access only
            </button>
          </div>

          {errorMessage ? <div className="error-banner">{errorMessage}</div> : null}
          {message ? <div className="success-banner">{message}</div> : null}
        </div>
      </section>
    </div>
  );
};

export default SignInPage;
