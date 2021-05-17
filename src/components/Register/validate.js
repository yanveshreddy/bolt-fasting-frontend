// export function minMaxLength(text, minLength, maxLength) {
//   let result = !text || text.length < minLength;
//   if (maxLength) result = result || text.length < minLength;
//   return result;
// }

// export function validEmail(text) {
//   const regex = RegExp(
//     /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
//   );

//   return !regex.test(text);
// }

export function validate(values) {
  let errors = {};
  let { firstName, lastName, email, password, confirmpassword } = values;
  if (!firstName) {
    errors.firstName = "First Name is Required";
  } else if (firstName.length < 3)
    errors.firstName = "First Name must be 3 characters or more";

  if (!lastName) {
    errors.lastName = "Required";
  } else if (lastName.length < 3)
    errors.lastName = "Last Name must be 3 characters or more";

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

  if (!confirmpassword) {
    errors.confirmpassword = "Password is required";
  } else if (confirmpassword.length < 8) {
    errors.confirmpassword = "Password must be 8 or more characters";
  } else if (confirmpassword !== password) {
    errors.confirmpassword = "passwords and confirmpassword should match";
  }

  return errors;
}
