import "./App.css";
import {useForm} from "react-hook-form";

export default function App() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} type="text" placeholder="Email" />
      <input {...register("password")} type="password" placeholder="Password" />
      <button type="submit">Submit</button>
    </form>
  );
}
