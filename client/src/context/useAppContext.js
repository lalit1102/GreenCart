import { useContext } from "react";
import { AppContext } from "./AppContextSource";

export const useAppContext = () => {
  return useContext(AppContext);
};

export default useAppContext;
