import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Pages from ".";
import { createUser } from "../api/users";
import ErrorMessage from "../components/ErrorMessage";

const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email." }),
  password: z
    .string()
    .regex(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
      ),
      {
        message:
          "Must contain at least 8 characters, one uppercase, one lowercase, one number, one special character.",
      }
    ),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const [error, setError] = useState<string>("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: any) => createUser(data),
    onSuccess: async (data: any) => {
      if (data.message) {
        setError(await data.message);
      } else {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },
  });

  function onSubmit(data: any) {
    mutation.mutate(data);
  }

  return (
    <Pages>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col gap-4 max-w-sm mx-auto`}
      >
        <h3 className={`font-medium text-lg`}>Register</h3>
        <input
          type="text"
          className={`px-4 py-2 rounded-md focus:ring focus:border-blue-500 border border-black-500 focus:outline-none`}
          placeholder="Email"
          {...register("email")}
        ></input>
        {errors.email?.message && (
          <ErrorMessage message={errors.email?.message as string} />
        )}
        <input
          type="text"
          className={`px-4 py-2 rounded-md focus:ring focus:border-blue-500 border border-black-500 focus:outline-none`}
          placeholder="Password"
          {...register("password")}
        ></input>
        {errors.password?.message && (
          <ErrorMessage message={errors.password?.message as string} />
        )}
        <button
          type="submit"
          className={`bg-blue-500 text-white rounded-md hover:bg-blue-700 px-4 py-2`}
        >
          Submit
        </button>
      </form>
      {error && <ErrorMessage message={error} />}
    </Pages>
  );
}
