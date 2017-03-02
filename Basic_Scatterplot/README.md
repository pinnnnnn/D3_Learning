# Basic Scatter Plot
This project is an extension of CSC-395 Data Visualization [lab webpage](http://www.cs.grinnell.edu/~curtsinger/teaching/2017S/CSC395/labs/08.scatter-plot.html).

In this project, I implemented(methods I learned):

+ x and y axis by using d3.scaleLinear() function and calling xaxis/yaxis method.
```js
 d3.scaleLinear()
    .range(a,b)
    .domain(x,y)；
````

+ Interactive mouse over function by using ·
```js
 .on("mouseover", function(d))； 
 .on("mouseout", function(d))；
```
to impelement the mouseover, and to let it fade away.
