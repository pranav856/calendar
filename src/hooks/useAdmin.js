import usePersistentState from "./usePersistentState";
import { STORAGE_KEYS } from "../config/storageKeys";

export default function useAdmin() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] =
    usePersistentState(
      STORAGE_KEYS.ADMIN_SESSION,
      false
    );

  const login = () => {
    setIsAdminLoggedIn(true);
  };

  const logout = () => {
    setIsAdminLoggedIn(false);
  };

  return {
    isAdminLoggedIn,
    setIsAdminLoggedIn,
    login,
    logout,
  };
}