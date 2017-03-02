# Build a Bar Chart
See the [lab webpage](http://www.cs.grinnell.edu/~curtsinger/teaching/2017S/CSC395/labs/07.bar-graph.html) for detailed instructions on this lab.

You should add stacked bars, a legend, and value labels above each bar. The provided code is very similar to what we wrote in class, but I cleaned up some of the position calculation and moved it to helper functions. There are now constants that let you specify left, right, top, and bottom margins separately. As you add to this chart, try to minimize the use of "magic numbers" and use meaningful constants instead.

Don't forget, this lab requires that you run the bar graph page from a web server instead of just opening the file directly on your machine. To do this, run the following command in a terminal from the directory that contains your lab code:

```
$ python -m SimpleHTTPServer
```

Once the program has started up, launch a web browser and go to <http://localhost:8000/lab.html> to load the lab's main page.
