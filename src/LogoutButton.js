// this code came from the Auth0 documentation, https://auth0.com/docs/quickstart/spa/react?download=true
// also, this code came from our 301 course repo...

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
};

export default LogoutButton;