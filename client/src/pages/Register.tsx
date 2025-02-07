import { useForm } from "react-hook-form";
import { Button } from "../ui";
import * as apiClient from "../api/apiClient";
import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Registration Successfull", type: "SUCCESS" });

      // Invalidate auth-token
      await queryClient.invalidateQueries("validate-token");
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
    <form className="flex flex-col  py-52  w-1/2 mx-auto">
      <h3 className="text-xl  text-gray-600 font-bold mb-6">
        Create an account
      </h3>
      <div className="flex flex-col md:flex-row gap-5">
        {/* First name */}
        <label className="text-label flex-1">
          First Name
          <input
            type="text"
            className="text-input"
            {...register("firstName", { required: "This field is required" })}
          />
          {errors.firstName && (
            <span className="text-muted text-red-500">
              {errors.firstName.message}
            </span>
          )}
        </label>

        {/* Last name */}
        <label className="text-label flex-1">
          Last Name
          <input
            type="text"
            className="text-input"
            {...register("lastName", { required: "This field is required" })}
          />
          {errors.lastName && (
            <span className="text-muted text-red-500">
              {errors.lastName.message}
            </span>
          )}
        </label>
      </div>

      {/* Email */}
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

      {/* Confirm password */}
      <label className="text-label flex-1">
        Confirm Password
        <input
          type="password"
          className="text-input"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your passwords do not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-muted text-red-500">
            {errors.confirmPassword.message}
          </span>
        )}
      </label>

      {/* Submit button */}
      <span>
        {" "}
        <Button
          label="Create Account"
          type="submit"
          className=" bg-primary text-light"
          onClick={onSubmit}
        />
      </span>
    </form>
  );
};

export default Register;
