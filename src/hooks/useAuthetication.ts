import { useEffect, useState } from 'react';
import { getUser } from '../redux/authSllice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';


const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const disptach = useDispatch<AppDispatch>()

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);

      try {
        const response = await disptach(getUser()).unwrap();
        console.log(response,"response");
            if(response.data.user){
                setIsAuthenticated(true)
                setRole(response.data.user.is_host ? "host" :"renter")
                setIsLoading(false)
            }
        else {
          setIsAuthenticated(false);
          setRole(null);
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
        setRole(null);
        setIsLoading(false);
      }

    };

    checkAuth();
  });

  return { isAuthenticated, isLoading, role };
};

export default useAuthentication;
