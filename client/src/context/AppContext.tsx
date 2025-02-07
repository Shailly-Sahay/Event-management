import React, { useContext, useState } from "react";
import { Toast } from "../ui";
import { useQuery, useQueryClient } from "react-query"; // ✅ Import useQueryClient
import * as apiClient from "../api/apiClient";
import { Loader } from "../ui";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  signOut: () => void;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  const queryClient = useQueryClient();

  const { isLoading, isError } = useQuery(
    "validate-token",
    apiClient.validateToken,
    {
      retry: false,
    }
  );

  const signOut = () => {
    localStorage.removeItem("token");
    queryClient.invalidateQueries("validate-token");
  };

  if (isLoading) return;
  <div className="h-screen flex items-center justify-center">
    <Loader show={isLoading} />
  </div>;

  return (
    <AppContext.Provider
      value={{
        showToast: setToast,
        isLoggedIn: !isError,
        signOut,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  return context as AppContext;
};
