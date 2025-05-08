import "./App.css";
import { useUpdateUser, useUser } from "./api.js";
import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import {yupResolver} from "@hookform/resolvers/yup/src/index.js";

export default function App({ id }) {
  const userQuery = useUser(id);
  const updateUserMutation = useUpdateUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (userQuery.data) {
      setFormData(userQuery.data);
    }
  }, [userQuery.data]);

  useEffect(() => {
    setIsDirty(
      Object.entries(formData).some(
        ([key, value]) => userQuery.data?.[key] !== value,
      ),
    );
  }, [formData, userQuery.data]);

  const reset = () => {
    setFormData(
      userQuery.data ?? {
        name: "",
        email: "",
        password: "",
      },
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateUserMutation.mutateAsync({
      id,
      ...formData,
    });
  };

  // const schema = yup
  //   .object({
  //     email: yup.string().email().required(),
  //     password: yup.string().min(8).required(),
  //   })
  //   .required();

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
        onChange={(e) => setFormData((l) => ({ ...l, name: e.target.value }))}
      />
      <input
        type="text"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData((l) => ({ ...l, email: e.target.value }))}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) =>
          setFormData((l) => ({ ...l, password: e.target.value }))
        }
      />
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

  // return (
  //   <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
  //     <input {...register("email")} type="text" placeholder="Email" />
  //     {errors.email && (
  //       <div className="text-red-500">{errors.email.message}</div>
  //     )}
  //     <input {...register("password")} type="password" placeholder="Password" />
  //     {errors.password && (
  //       <div className="text-red-500">{errors.password.message}</div>
  //     )}
  //     <button disabled={isSubmitting} type="submit">
  //       {isSubmitting ? "Loading..." : "Submit"}
  //     </button>
  //     {errors.root && <div className="text-red-500">{errors.root.message}</div>}
  //   </form>
  // );
}
