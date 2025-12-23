import { createContext } from "react";

export const KeepAliveContext = createContext<any>({
  setKeepAliveState: () => {},
  keepAliveStates: {},
  dispatch: () => {},
});
