import React from "react";
import { Link } from "react-router-dom";
import { Button, PageLink } from "../";
import { useAppContext } from "../../context/AppContext";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../../api/apiClient";

const Header = () => {
  const { isLoggedIn, showToast } = useAppContext();

  const queryClient = useQueryClient();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validate-token");
      showToast({ message: "Signed out successfully", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleSignOut = () => {
    mutation.mutate();
  };

  return (
    <div className="py-6">
      <div className="section-pd-x flex justify-between items-center">
        <Link to="/">
          <p className="fs-body-lg tracking-tight">EventManage</p>
        </Link>

        {isLoggedIn ? (
          <div className="flex items-center space-x-8">
            <PageLink text="Dashboard" href="/dashboard" />
            <PageLink text="My Hotels" href="/my-hotels" />

            <Button
              type="button"
              text="Sign out"
              onClick={handleSignOut}
              className="bg-light text-dark"
            />
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <PageLink text="Upcoming Event" href="/events" />
            <Button
              text="Sign in"
              href="/sign-in"
              className="bg-light text-dark"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
