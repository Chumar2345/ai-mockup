// pages/admin/login.js
"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState(null);

  // React Hook Form for validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Submit handler
  const onSubmit = async (data) => {
    try {
      // Mock API call or replace with actual authentication logic
      const response = await axios.post("/api/admin/login", {
        username: data.username,
        password: data.password,
      });

      if (response.status === 200) {
        // Redirect to dashboard after successful login
        router.push("/admin/dashboard");
      }
    } catch (err) {
      setError("Invalid username or password.");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#000",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
      }}
    >
      <div
        style={{
          background: "#333",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.5)",
          width: "400px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
          Admin Login
        </h2>

        {error && (
          <div style={{ color: "red", marginBottom: "1rem", textAlign: "center" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: "1rem" }}>
            <label>Username</label>
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              style={{
                width: "100%",
                padding: "0.5rem",
                marginTop: "0.3rem",
                border: "1px solid #555",
                borderRadius: "4px",
                backgroundColor: "#222",
                color: "#fff",
              }}
            />
            {errors.username && (
              <p style={{ color: "red", fontSize: "0.8rem" }}>
                {errors.username.message}
              </p>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              style={{
                width: "100%",
                padding: "0.5rem",
                marginTop: "0.3rem",
                border: "1px solid #555",
                borderRadius: "4px",
                backgroundColor: "#222",
                color: "#fff",
              }}
            />
            {errors.password && (
              <p style={{ color: "red", fontSize: "0.8rem" }}>
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.7rem",
              border: "none",
              borderRadius: "4px",
              backgroundColor: "#007bff",
              color: "#fff",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
