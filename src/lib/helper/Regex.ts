export const validPostalCode = new RegExp("/^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/");

export const validPhoneNumber = new RegExp("^[0-9]{10}$");

export const validEmail = new RegExp(
  "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$"
);

export const validPassword = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);

export const validName = new RegExp("^[a-zA-Z ]{2,30}$");

export const validBirthDate = new RegExp(
  "^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\\d\\d$"
);
export const validateIBAN = new RegExp(
  '^NL[0-9]{2}[A-z0-9]{4}[0-9]{10}$'
);

