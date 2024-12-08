import { calculateBreakdown } from './index';

describe('calculateBreakdown', () => {
  it('should calculate breakdown correctly for a positive balance', () => {
    const balance = 1000;
    const result = calculateBreakdown(balance);

    expect(result.interest).toBe(4.17);
    expect(result.fees).toBe(10);
    expect(result.taxes).toBe(149.13);
    expect(result.availableBalance).toBe(845.04);
  });

  it('should handle zero balance', () => {
    const balance = 0;
    const result = calculateBreakdown(balance);

    expect(result.interest).toBe(0);
    expect(result.fees).toBe(0);
    expect(result.taxes).toBe(0);
    expect(result.availableBalance).toBe(0);
  });

  it('should handle large numbers', () => {
    const balance = 1000000;
    const result = calculateBreakdown(balance);

    expect(result.interest).toBe(4166.67);
    expect(result.fees).toBe(10000);
    expect(result.taxes).toBe(149125);
    expect(result.availableBalance).toBe(845041.67);
  });

  it('should handle decimal numbers', () => {
    const balance = 1234.56;
    const result = calculateBreakdown(balance);

    expect(result.interest).toBe(5.14);
    expect(result.fees).toBe(12.35);
    expect(result.taxes).toBe(184.10);
    expect(result.availableBalance).toBe(1043.25);
  });
}); 