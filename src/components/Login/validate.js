export function validate(values) {
  let errors = {};
  let { email, password } = values;

  if (!email) {
    errors.email = "Email address is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password = "Password must be 8 or more characters";
  }
  return errors;
}
