import { useCallback, useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

export const useRefreshByUser = (refetch: () => Promise<unknown>) => {
  const [isRefetchingByUser, setIsRefetchingByUser] = useState(false);

  async function refetchByUser() {
    setIsRefetchingByUser(true);

    try {
      await refetch();
    } finally {
      setIsRefetchingByUser(false);
    }
  }

  return {
    isRefetchingByUser,
    refetchByUser,
  };
};

export const useRefreshOnFocus = (refetch: () => void) => {
  const enabledRef = useRef(false);

  useFocusEffect(
    useCallback(() => {
      if (enabledRef.current) {
        refetch();
      } else {
        enabledRef.current = true;
      }
    }, [refetch]),
  );
};
