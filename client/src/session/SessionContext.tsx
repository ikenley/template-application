import React, {
  createContext,
  useState,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from "react";
import axios from "axios";
import {
  Session,
  UpdateSessionParams,
  SessionOptionSet,
  defaultSessionOptionSet,
} from "../types";
import { AuthContext } from "../auth/AuthContext";

const defaultSession: Session = {
  isLoading: true,
  sessionId: "",
  institutionId: 0,
  institutionName: "",
  regionId: 0,
  regionName: "",
  marketShareModel: 0,
  customMarketShareOptionMap: {},
  compareInstitutionIds: [],
};

const defaultSessionProps = {
  session: defaultSession,
  optionSet: defaultSessionOptionSet,
  updateSession: (s: UpdateSessionParams) => {},
};

export const SessionContext = createContext(defaultSessionProps);

export const SessionContextProvider = ({ children }: any) => {
  const [session, setState] = useState<Session>(defaultSession);
  const [optionSet, setOptionSet] = useState<SessionOptionSet>(
    defaultSessionOptionSet
  );
  const authContext = useContext(AuthContext);
  const { sessionId } = session;

  // Get session when AuthContext changes
  useEffect(() => {
    if (authContext.isLoading) {
      return;
    }

    axios.get(`/api/session/createorget/${authContext.userId}`).then((res) => {
      setState(res.data);
    });

    axios.get("/api/session/optionset").then((res) => {
      setOptionSet(res.data);
    });
  }, [authContext, setState, setOptionSet]);

  const updateSession = useCallback(
    (s: UpdateSessionParams) => {
      s.sessionId = sessionId;

      // Reset loadmask until AJAX resolves
      setState((ses) => {
        return { ...ses, ...s, isLoading: true };
      });

      axios.post("/api/session/update", s).then((res) => {
        setState(res.data);
      });
    },
    [sessionId, setState]
  );

  const value = useMemo(() => {
    return { session, optionSet, updateSession };
  }, [session, optionSet, updateSession]);

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

export default SessionContext;
