import React, { useEffect, useState } from 'react';
import InputFormAuth from '../../Components/Form/InputFormAuth/InputFormAuth';
import AuthLayout from '../../Components/Layout/AuthLayout/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../Features/auth/authApi';
import style from '../../Components/Layout/AuthLayout/style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../Features/auth/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const [loginUser, { isLoading, isSuccess, error }] = useLoginUserMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [checkTerms, setCheckTerms] = useState(false);

  const loginHandler = async () => {
    const data = await loginUser({ email, password });
    const userBeforRedestruct = data.data.data;
    const { refreshToken, token, ...other } = userBeforRedestruct;
    dispatch(setCredentials({ data: other, token, refreshToken }));
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess]);

  return (
    <div>
      <AuthLayout title="Welcome" description="Log in into your exiting account">
        {isLoading ? (
          'Wait for a minute...'
        ) : (
          <>
            <InputFormAuth title="Email" name="email" type="text" onchange={(e) => setEmail(e.target.value)} />
            <InputFormAuth title="Password" name="password" type="password" onchange={(e) => setPassword(e.target.value)} />

            <div className="form-check mb-3 customCheck">
              <input className="form-check-input" type="checkbox" onChange={() => setCheckTerms((prev) => !prev)} value="" id={style.flexCheckDefault} />
              <label className={`form-check-label ${style.formLabel}`} for={style.flexCheckDefault}>
                I agree to terms & conditions
              </label>
            </div>
            <div className="d-grid mb-2 mt-3 text-light">
              <button className="btn btn-warning text-light" type="button" onClick={loginHandler} disabled={!checkTerms}>
                Login
              </button>
            </div>
            <div className="forgotPassword text-end mb-3">
              <a className={`link-dark text-decoration-none ${style.formLabel}`} style={{ fontSize: '14px' }} href="">
                Forgot Password?
              </a>
            </div>
            <div className={`loginLink text-center mt-3 ${style.formLabel}`}>
              <p>
                Don’t have an account?{' '}
                <Link to={'/register'} style={{ textDecoration: 'none', color: 'rgb(239, 200, 26)' }}>
                  {' '}
                  Sign Up
                </Link>
              </p>
            </div>
          </>
        )}
      </AuthLayout>
    </div>
  );
};

export default Login;
