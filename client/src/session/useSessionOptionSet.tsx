import { useEffect, useState } from "react";
import axios from "axios";
import { SessionOptionSet } from "../types";

// Hook for fetching a SessionOptionSet

const useSessionOptionSet = () => {
  const [optionSet, setOptionSet] = useState<SessionOptionSet | null>(null);

  useEffect(() => {
    axios.get("/api/session/sessionoptionset").then((res) => {
      setOptionSet(res.data);
    });
  }, [setOptionSet]);

  return optionSet;
};

export default useSessionOptionSet;
