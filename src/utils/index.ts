export const calculateBreakdown = (balance: number) => {
  const taxRate = 0.15;
  const reasonablePercentage = 0.01;
  const annualRate = 0.05;

  const interest = (balance * annualRate).toFixed(2);
  const fees = balance * reasonablePercentage;
  const taxes = (balance * taxRate).toFixed(3);

  const availableBalance = Number(
    (balance - balance * 0.1 - parseFloat(taxes)).toFixed(1),
  );

  return {
    interest,
    fees,
    taxes: taxes,
    availableBalance,
  };
};
