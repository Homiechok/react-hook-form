import "./App.css";
import { useForm } from "react-hook-form";

export default function App() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      throw new Error();
      console.log(data);
    } catch (error) {
      setError("root", {
        message: "This email is already taken",
      })
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", {
          required: "Email is required",
          validate: (value) => {
            if (!value.includes("@")) {
              return "Email must include @";
            }
            return true;
          },
        })}
        type="text"
        placeholder="Email"
      />
      {errors.email && (
        <div className="text-red-500">{errors.email.message}</div>
      )}
      <input
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
        })}
        type="password"
        placeholder="Password"
      />
      {errors.password && (
        <div className="text-red-500">{errors.password.message}</div>
      )}
      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading..." : "Submit"}
      </button>
      {errors.root && (
        <div className="text-red-500">{errors.root.message}</div>
      )}
    </form>
  );
}
