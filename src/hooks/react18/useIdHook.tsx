import { useId, useState } from 'react'
import FormField from '../../components/FormField';

interface FormState {
  name: string;
  email: string;
  password: string;
}

interface ErrorState {
  name?: string;
  email?: string;
  password?: string;
}

export default function useIdHook() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<ErrorState>({});
  const baseId = useId();

  const handleChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const validate = () => {
    const newErrors: ErrorState = {};

    if (!form.name) newErrors.name = "Name is required";
    if (!form.email.includes("@")) newErrors.email = "Invalid email";
    if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted:", form);
      alert("Success!");
    }
  };
  console.log(baseId, "baseId")
  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
      <h2>Signup</h2>

      <FormField
        id={`${baseId}-name`}
        errorId={`${baseId}-name-error`}
        label="Name"
        value={form.name}
        onChange={handleChange("name")}
        error={errors.name}
        required
      />

      <FormField
        id={`${baseId}-email`}
        errorId={`${baseId}-email-error`}
        label="Email"
        type="email"
        value={form.email}
        onChange={handleChange("email")}
        error={errors.email}
        required
      />

      <FormField
        id={`${baseId}-password`}
        errorId={`${baseId}-password-error`}
        label="Password"
        type="password"
        value={form.password}
        onChange={handleChange("password")}
        error={errors.password}
        required
      />

      <button type="submit">Create Account</button>
    </form>
  )
}
