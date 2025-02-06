import { RegisterFormData } from "../pages/Register";
import { SignInFormData } from "../pages/Login";
import { EventFormData } from "../ui/components/EventForm";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// Register a user
export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

// Login
export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

// Token validator
export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  return response.json();
};

// Logout
export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Error during signout");
  }
};

// Event creation
export const createEvent = async (formData: EventFormData) => {
  console.log("Sending Data:", formData);

  // Convert formData to FormData object
  const data = new FormData();
  data.append("name", formData.name);
  data.append("description", formData.description);
  data.append("dateTime", formData.dateTime);
  data.append("location", formData.location);
  data.append("category", formData.category);
  if (formData.maxAttendees)
    data.append("maxAttendees", formData.maxAttendees.toString());

  // Append image file
  if (formData.imageFile && formData.imageFile.length > 0) {
    data.append("image", formData.imageFile[0]); // ✅ Now sending file correctly
  }

  const response = await fetch(`${API_BASE_URL}/api/event/create`, {
    method: "POST",
    credentials: "include",
    body: data,
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};
