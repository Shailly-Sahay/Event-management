import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api/apiClient";
import { Button } from "../ui";
import { useAppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      // Show toast message
      showToast({ message: "Sign in Successfull", type: "SUCCESS" });
      // Invalidate auth_token
      await queryClient.invalidateQueries("validate-token");
      //   navigate to the home page
      navigate("/events");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form
      className="flex flex-col py-32 lg:py-52 section-pd-x lg:px-0 w-full lg:w-1/2 mx-auto"
      onSubmit={onSubmit}
    >
      <h3 className="text-xl  text-gray-600 font-bold mb-6">Sign In</h3>
      <label className="text-label flex-1">
        Email
        <input
          type="email"
          className="text-input"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-muted text-red-500">
            {errors.email.message}
          </span>
        )}
      </label>

      {/* Password */}
      <label className="text-label flex-1">
        Password
        <input
          type="password"
          className="text-input"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        />
        {errors.password && (
          <span className="text-muted text-red-500">
            {errors.password.message}
          </span>
        )}
      </label>

      <div>
        <Button
          label="Sign In"
          type="submit"
          className="justify-center mb-4"
          onClick={onSubmit}
        />
      </div>

      {/* Submit button */}
      <span className="mt-10">
        <span className="text-sm">
          Not Registered? {"  "}
          <Link to="/register" className="underline">
            Click here to create an account
          </Link>
        </span>{" "}
      </span>
    </form>
  );
};

export default SignIn;
