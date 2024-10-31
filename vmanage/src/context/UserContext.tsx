import { createContext, ReactNode, useState } from "react";
import { User } from "../constants/User";

interface UserContextType {
  user: User | null;
  handleLoginLogout: (user: User | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const handleLoginLogout = (user: User | null) => {
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ user, handleLoginLogout }}>
      {children}
    </UserContext.Provider>
  );
};
