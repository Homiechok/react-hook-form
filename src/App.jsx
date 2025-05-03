import "./App.css";
import {useForm} from "react-hook-form";

export default function App() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email", {
        required: true,
        validate: value => value.includes("@"),
      })} type="text" placeholder="Email" />
      <input {...register("password", {
        required: true,
        minLength: 8,
      })} type="password" placeholder="Password" />
      <button type="submit">Submit</button>
    </form>
  );
}
