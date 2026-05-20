import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginUser } from '../../services/api';
import style from './Login.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await loginUser({ email, password });
      const { token, user } = response.data;
      login(user, token);
      navigate('/dashboard');
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        'Invalid credentials. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className={`${style.header} my-5 g-1 p-2`}>
        <span>MARKETING AGENCY ADMIN</span>
        <h2>Welcome back</h2>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form className={`${style.form} d-flex flex-column my-5`} onSubmit={handleSubmit}>
        <div className="mb-3 d-flex flex-column">
          <label htmlFor="loginEmail" className="form-label">
            EMAIL ADDRESS
          </label>
          <div className={`${style.input} d-flex align-items-center`}>
            <i className="fa-solid fa-envelope"></i>
            <input
              type="email"
              className="form-control"
              id="loginEmail"
              placeholder="name@agency.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-3 d-flex flex-column">
          <label htmlFor="loginPassword" className="form-label">
            PASSWORD
          </label>
          <div className={`${style.input} d-flex align-items-center`}>
            <i className="fa-solid fa-lock"></i>
            <input
              type="password"
              className="form-control"
              id="loginPassword"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className={`${style.btn} btn btn-primary p-3`}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" />
              Signing in…
            </>
          ) : (
            'Login to Dashboard'
          )}
        </button>
      </form>

      <div className={style.access}>
        <span>Need access to the CMS?</span>{' '}
        <p>Contact your system architect.</p>
      </div>
    </div>
  );
}

export default Login;
