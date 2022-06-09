import { useContext } from "react";
import AuthProviderUserContext from "../Context/AuthProviderUsers";

const useAuth = () => {
  return useContext(AuthProviderUserContext);
};

export default useAuth;
