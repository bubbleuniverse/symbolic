# User Manual

## Overview

This is a symbolic mathematics calculator that performs various mathematical operations on LaTeX expressions. The interface is optimized for both desktop and mobile devices, featuring a virtual keyboard for easy mathematical input.

**How it works:** Enter a mathematical expression in LaTeX format, select an operation from the dropdown menu, and click "Calculate" to get the result displayed in beautiful LaTeX formatting.

## Getting Started

1. **Enter Expression**: Type your mathematical expression in the input field using LaTeX syntax
2. **Select Operation**: Choose from the available operations (integrate, differentiate, etc.)
3. **Calculate**: Click the "Calculate" button to process your expression
4. **View Result**: The result appears in the output field below
5. **Copy Result**: Use the "Copy LaTeX" button to copy the result for use elsewhere

## Available Operations

The calculator supports the following mathematical operations:

- **Solve**: Solve algebraic equations
- **Integrate**: Compute indefinite integrals
- **Differentiate**: Compute derivatives
- **Simplify**: Simplify mathematical expressions
- **Expand**: Expand algebraic expressions
- **Factor**: Factor polynomials
- **Collect**: Collect like terms
- **Limit**: Compute limits
- **Series**: Generate Taylor/Maclaurin series expansions

## Examples

### Integration

Compute indefinite integrals of various functions:

| Input                     | Output                                                       |
| ------------------------- | ------------------------------------------------------------ |
| $x^a$                     | $\frac{x^{a + 1}}{a + 1}$                                    |
| $a^{x}$                   | $a^{x}\log a$                                                |
| $\log_{a}bx$              | $-x+\frac{x\log{\left(bx\right)}}{\log{\left(a\right)}}$     |
| $\sin\left(ax\right)$     | $-\frac{\cos{\left(ax\right)}}{a}$                           |
| $1/\sqrt{a^2-x^2}$        | $\operatorname{asin}{\left(\frac{x}{a}\right)}$              |

### Series Expansion

Generate Taylor series expansions around x=0:

| Input                      | Output                                                       |
| -------------------------- | ------------------------------------------------------------ |
| $a^{x}$                    | $1 + x \log{\left(a \right)} + \frac{x^{2} \log{\left(a \right)}^{2}}{2} + \frac{x^{3} \log{\left(a \right)}^{3}}{6} + \frac{x^{4} \log{\left(a \right)}^{4}}{24} + \frac{x^{5} \log{\left(a \right)}^{5}}{120} + O\left(x^{6}\right)$ |
| $\sin x$                   | $x - \frac{x^{3}}{6} + \frac{x^{5}}{120} + O\left(x^{6}\right)$ |
| $\log\left(1+x\right)$     | $x - \frac{x^{2}}{2} + \frac{x^{3}}{3} - \frac{x^{4}}{4} + \frac{x^{5}}{5} + O\left(x^{6}\right)$ |

### Differential Equations

Solve ordinary differential equations (ODEs):

| Input                                                        | Output                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| $\frac{d}{dx}f\left(x\right)-3f\left(x\right)$          | $f{\left(x \right)} = C_{1} e^{3 x}$                         |
| $\frac{d}{dx}\frac{d}{dx}f\left(x\right)+4f\left(x\right)$ | $f{\left(x \right)} = C_{1} \sin{\left(2 x \right)} + C_{2} \cos{\left(2 x \right)}$ |

## Important Notes

### Supported Features ✅

- **Variables**: Only `x` is supported as a variable
- **Functions**: Only `f(x)` is supported as a function
- **Operator**: `d` is reserved as the differential operator
- **Constants**: `a`, `b`, `c` are treated as real constants
- **Exponential Function**: Use `\exp(x)` instead of `e^x`
- **Performance**: First calculation may take up to 15 seconds due to lazy loading for cost optimization

### Not Currently Supported ❌

- **Multi-variable functions**: Only single-variable expressions are supported
- **Partial differential equations (PDEs)**: Only ordinary differential equations (ODEs) are supported
- **Complex numbers**: The imaginary unit `i` is not reserved
- **Natural number e**: Use `\exp(x)` function instead of `e^x`

## Tips for Best Results

1. **Use proper LaTeX syntax**: Ensure your expressions follow standard LaTeX mathematical notation
2. **Be patient on first use**: The initial calculation may take longer due to server initialization
3. **Check your input**: Verify that your expression uses only supported variables and functions
4. **Use example buttons**: Click on the example expressions to see proper formatting
5. **Copy results**: Use the "Copy LaTeX" button to easily use results in other documents

## Keyboard Shortcuts

- **Ctrl/Cmd + Enter**: Calculate the current expression
- **F1** or **Ctrl/Cmd + H**: Toggle help section
- **Tab**: Navigate between input fields and buttons

## Troubleshooting

**Problem**: Calculation takes a long time
- **Solution**: This is normal for the first calculation. Subsequent calculations should be faster.

**Problem**: "Error" message appears
- **Solution**: Check that your expression uses only `x` as a variable and follows proper LaTeX syntax.

**Problem**: Result doesn't appear
- **Solution**: Ensure you have selected an operation from the dropdown menu before clicking "Calculate".
