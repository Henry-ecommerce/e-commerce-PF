import { useContext } from "react";
import AuthProviderProducContext from "../Context/AuthProviderAdmin";

const useAuthAd = () => {
  return useContext(AuthProviderProducContext);
};

export default useAuthAd;
