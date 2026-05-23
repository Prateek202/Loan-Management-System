export const calculateLoan = (
  principal: number,
  tenureDays: number
) => {
  const rate = 12;

  const interest =
    (principal * rate * tenureDays) /
    (365 * 100);

  const totalRepayment =
    principal + interest;

  return {
    interestAmount: Number(interest.toFixed(2)),
    totalRepayment: Number(
      totalRepayment.toFixed(2)
    ),
  };
};