export const calculateBreakdown = (balance: number) => {
  // Constants
  const ANNUAL_INTEREST_RATE = 0.05;  // 5% annual interest
  const MONTHLY_INTEREST_RATE = ANNUAL_INTEREST_RATE / 12;
  const FEE_RATE = 0.01;  // 1% fee
  const TAX_RATE = 0.15;  // 15% tax

  // Calculate components
  const monthlyInterest = Number((balance * MONTHLY_INTEREST_RATE).toFixed(2));
  const fees = Number((balance * FEE_RATE).toFixed(2));
  
  // Calculate balance after fees but before tax
  const balanceAfterFees = balance - fees + monthlyInterest;
  
  // Calculate tax on the net amount after fees
  const taxes = Number((balanceAfterFees * TAX_RATE).toFixed(2));
  
  // Calculate final available balance
  const availableBalance = Number((balanceAfterFees - taxes).toFixed(2));

  return {
    interest: monthlyInterest,
    fees,
    taxes,
    availableBalance,
  };
};
