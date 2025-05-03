import { useState } from "react";
import "./App.css";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors({
      email: "",
      password: "",
    });

    // Manual validation
    if (!email.includes("@")) {
      setErrors({ ...errors, email: "Email must include @" });
      return;
    }

    if (password.length < 8) {
      setErrors({
        ...errors,
        password: "Password must be at least 8 characters",
      });
      return;
    }

    // Form submission
    console.log("Form submitted!");
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <div className="text-pink-500">{errors.email}</div>}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && <div className="text-pink-500">{errors.password}</div>}
      <button type="submit">Submit</button>
    </form>
  );
}
