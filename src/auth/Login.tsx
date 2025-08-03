import { useNavigate } from 'react-router-dom';

import { LoginForm } from './Forms/LoginForm';
import { LoginLayout } from '../components/layout/loginLayout';

export const Login = () => {
  const navigate = useNavigate();

  return (
    <LoginLayout title="Login">
        <LoginForm/>
    </LoginLayout>
  );
};
