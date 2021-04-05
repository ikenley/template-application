import React, {
  createContext,
  useState,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from "react";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";

export type Session = {
  isLoading: boolean;
  sessionId: string;
  institutionId: number;
  institutionName: string;
  regionId: number;
  regionName: string;
  marketShareModel: number;
};

const defaultSession: Session = {
  isLoading: true,
  sessionId: "",
  institutionId: 0,
  institutionName: "",
  regionId: 0,
  regionName: "",
  marketShareModel: 0,
};

const defaultSessionProps = {
  session: defaultSession,
  setSession: (s: Session) => {},
};

export const SessionContext = createContext(defaultSessionProps);

export const SessionContextProvider = ({ children }: any) => {
  const [session, setState] = useState<Session>(defaultSession);
  const authContext = useContext(AuthContext);

  const setSession = useCallback(
    (s: Session) => {
      setState(s);
    },
    [setState]
  );

  // Get session when AuthContext changes
  useEffect(() => {
    if (authContext.isLoading) {
      return;
    }

    axios.get(`/api/session/createorget/${authContext.userId}`).then((res) => {
      setState(res.data);
    });
  }, [authContext, setState]);

  const value = useMemo(() => {
    return { session, setSession };
  }, [session, setSession]);

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};
