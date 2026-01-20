# Integral Example

## Problem 
Solve the integral for the integrand

$$
f=\frac{1}{\sqrt{1-x^{2}}} ,x\in ( -1,1)
$$

## Solution

1. Substitute x with

$$
x=\cos t,t\in ( 0,\pi )
$$

2. Its differential is 

$$
\frac{dx}{dt} =-\sin t
$$

3. Given the chain rule of differential, the integral problem becomes solve the integral of a new integrant w.r.t. $t$

$$
f_{1} =f\cdot \frac{dx}{dt} =\frac{1}{\sqrt{1-x^{2}}} \cdot \frac{dx}{dt} =-\frac{\sin t}{\sqrt{1-\cos^{2} t}} =-\frac{\sin t}{|\sin t|}
$$

4. Since the $t\in ( 0,\pi )$, we know 

$$
\sin t >0
$$

5. This means

$$
f_{1} =-1
$$

6. Then the integral $I$ becomes

$$
I=\int f_{1} dt=-t+C
$$

where C is an undefined constant

7. Recall the inverse function between x and t

$$
t=\arccos x
$$

8. Substitute the x back, we finally have the integral $I$ as a function of x

$$
I=-\arccos x+C
$$

