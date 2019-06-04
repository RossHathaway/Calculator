**This calculator simulates the iPhone calc**

#Use

To test out the calculator, cd into the project directory (ProblemTwo) and type:
npm run devBuild

This will start Parcel's dev server, which will serve the page at localhost:1234

#Percentages

In this calculator, if there are two numbers (A and B) and only one (A) has a
percent sign, that one will be converted to a percentage of the other number.
Then the calculation will be performed with the new calculated percentage and
the non-percent number. A% + B = (A / 100 x B) + B

If both numbers have % signs, they will be calculated as regular numbers and the
result will have a % sign.

#Using the result of a calculation for the next calculation

If a calculation has just been performed, the result can be used as the first
number in the next calculation. Its sign or percent status may be changed by
pressing +/- or % buttons.

If a number is pressed instead before an operation is pressed, that number will
clear the old result and will become the first number for the next calculation.
