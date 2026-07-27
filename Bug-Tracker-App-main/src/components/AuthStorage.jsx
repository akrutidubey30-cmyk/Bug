import { useEffect } from "react";
import { useSelector } from "react-redux";

const AuthStorage = () => {
  const accounts = useSelector((state) => state.auth.accounts);
  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  return null;
};

export default AuthStorage;
