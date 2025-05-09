import "./App.css";
import { useUpdateUser, useUser } from "./api.js";
import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
import * as yup from "yup";
import { z } from "zod";
// import {yupResolver} from "@hookform/resolvers/yup/src/index.js";

const initialFormState = {
  name: "",
  email: "",
  password: "",
};

const formDataSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export default function App({ id }) {
  const userQuery = useUser(id);
  const updateUserMutation = useUpdateUser();
  const [userFormData, setUserFormData] = useState({});
  const [isError, setIsError] = useState(false);

  const formData = {
    ...initialFormState,
    ...userQuery.data,
    ...userFormData,
  };

  const isDirty = Object.entries(userFormData).some(
    ([key, value]) => userQuery.data?.[key] !== value,
  );

  const reset = () => setUserFormData({});

  const validate = () => {
    const res = formDataSchema.safeParse(formData);

    if (res.success) {
      return undefined;
    } else {
      return res.error.format();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();

    if (errors) {
      setIsError(true);
      return;
    }

    await updateUserMutation.mutateAsync({
      id,
      ...formData,
    });
  };

  const errors = isError ? validate() : undefined;

  // const {
  //   register,
  //   handleSubmit,
  //   setError,
  //   formState: { errors, isSubmitting },
  // } = useForm({
  //   defaultValues: {
  //     email: "test@mail.ru",
  //   },
  //   resolver: yupResolver(schema),
  // });

  // const onSubmit = async (data) => {
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     console.log(data);
  //   } catch (error) {
  //     setError("root", {
  //       message: "This email is already taken",
  //     });
  //   }
  // };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={(e) =>
          setUserFormData((l) => ({ ...l, name: e.target.value }))
        }
      />
      <div className="text-rose-500">{errors?.name?._errors.join(', ')}</div>
      <input
        type="text"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) =>
          setUserFormData((l) => ({ ...l, email: e.target.value }))
        }
      />
      <div className="text-rose-500">{errors?.email?._errors.join(', ')}</div>
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) =>
          setUserFormData((l) => ({ ...l, password: e.target.value }))
        }
      />
      <div className="text-rose-500">{errors?.password?._errors.join(', ')}</div>
      <button
        type="submit"
        className="!bg-cyan-400"
        disabled={updateUserMutation.isPending || userQuery.isPending}
      >
        Submit
      </button>
      <button
        disabled={!isDirty || userQuery.isPending}
        onClick={() => reset()}
        type="button"
        className="!bg-red-400"
      >
        Reset
      </button>
    </form>
  );
}
