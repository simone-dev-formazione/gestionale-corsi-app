import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useUserStore } from '../hooks/useUserStore';

interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
  const user = useUserStore((state) => state.user);

  return (
    <Route
      {...rest}
      render={(props) =>
        !user ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default ProtectedRoute;