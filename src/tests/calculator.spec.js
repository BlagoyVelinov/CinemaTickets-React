import { test, it, expect, describe } from "vitest";
import calculatorForTest from "../utils/calculatorForTest";


test('Should multiply', () => {
    
});

// Окомплектовам няколко теста в една група
describe('Sum Functionality', () => {
    // Triple AAA pattern
    it('Should return positive value when adding positive numbers', (a, b) => {
        // Arrange - подготовката на входно изходните данни
        const firstNumber = 1;
        const secondNumber = 2;
        const expectedResult = 3;

        // Act - Изпълнението на функионалността
        const actualResult = calculatorForTest.sum(firstNumber, secondNumber);

        // Assert - очакване на резултата
        expect(actualResult).toEqual(expectedResult); // Jest like expect
        expect(actualResult).to.equal(expectedResult); // Chai like expect
    });

    it('Should return negative number when adding negative numbers', () => {
        expect(calculatorForTest.sum(-1, -2)).toBe(-3);
    });

});

describe('Multiply', () => {
    it('Should return positive number when multiplying positive numbers', () => {
        expect(calculatorForTest.multiply(2, 4)).toBe(8);
    });

    it('Should return positive number when multiplying negative numbers', () => {
        expect(calculatorForTest.multiply(-2, -4)).toBe(8);
    });
});