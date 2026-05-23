export const runBRE = (
  dob: string,
  salary: number,
  employmentMode: string,
  pan: string
) => {
  const errors = [];

  const birthYear = new Date(dob).getFullYear();
  const currentYear = new Date().getFullYear();

  const age = currentYear - birthYear;

  if (age < 23 || age > 50) {
    errors.push("Age should be between 23 and 50");
  }

  if (salary < 25000) {
    errors.push("Salary should be above 25000");
  }

  if (employmentMode === "UNEMPLOYED") {
    errors.push("Applicant cannot be unemployed");
  }

  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  if (!panRegex.test(pan)) {
    errors.push("Invalid PAN format");
  }

  return errors;
};