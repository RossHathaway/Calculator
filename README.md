**This calculator simulates the iPhone calc, but it is a little different**

#Using To test out the calculator, cd into the project directory (ProblemTwo)
and type: npm run devBuild

This will start Parcels dev server, which will serve the page at localhost:1234

#Percentages In this calculator, if there are two numbers (A and B) and only one
(A) has a percent sign, that one will be converted to a percentage of the other
number. Then the calculation will be performed with the new calculated
percentage and the non-percent number. A% + B = (A / 100 x B) + B

If both numbers have % signs, they will be calculated as regular numbers and the
result will have a % sign (the % sign is not currently displayed).

# changing sign with +/- key

This will toggle whether the currently active number is positive or negative. If
a calculation has just been performed, pressing this button is assumed to
signify starting a new calculation, not changing the sign of the result.
