  // Load the diamonds.csv data file
// Question for Charlie: is the way we plot the stack bar the best way possible?

  d3.csv("diamonds.csv", function(diamonds) {
    // Build an array of labels for our "bins"
    var labels = [
      '< 0.5ct',
      '0.5–1.0ct',
      '1.0–1.5ct',
      '1.5–2.0ct',
      '2.0–2.5ct',
      '>=2.5ct'
    ];
    var index;
    // Stacked bar
    var cut_quality = [{
      carat: '< 0.5ct',
      cut1: 0,
      cut2: 0,
      cut3: 0,
      cut4: 0,
      cut5: 0
    }, {
      carat: '0.5-1.0ct',
      cut1: 0,
      cut2: 0,
      cut3: 0,
      cut4: 0,
      cut5: 0
    }, {
      carat: '1.0-1.5ct',
      cut1: 0,
      cut2: 0,
      cut3: 0,
      cut4: 0,
      cut5: 0
    }, {
      carat: '1.5-2.0ct',
      cut1: 0,
      cut2: 0,
      cut3: 0,
      cut4: 0,
      cut5: 0
    }, {
      carat: '2.0-2.5ct',
      cut1: 0,
      cut2: 0,
      cut3: 0,
      cut4: 0,
      cut5: 0
    }, {
      carat: '>=2.5ct',
      cut1: 0,
      cut2: 0,
      cut3: 0,
      cut4: 0,
      cut5: 0
    }];


    for (var row of diamonds) {
      if (row.carat < 0.5) index = 0;
      else if (row.carat < 1.0) index = 1;
      else if (row.carat < 1.5) index = 2;
      else if (row.carat < 2.0) index = 3;
      else if (row.carat < 2.5) index = 4;
      else index = 5;

      if (row.cut == "Ideal") cut_quality[index].cut1++;
      else if (row.cut == "Premium") cut_quality[index].cut2++;
      else if (row.cut == "Very Good") cut_quality[index].cut3++;
      else if (row.cut == "Good") cut_quality[index].cut4++;
      else if (row.cut == "Fair") cut_quality[index].cut5++;
    }


    // Initialize the array of counts for each bin
    var counts = [0, 0, 0, 0, 0, 0];

    // Fill in the counts for each bin
    for (var row of diamonds) {
      if (row.carat < 0.5) counts[0]++;
      else if (row.carat < 1.0) counts[1]++;
      else if (row.carat < 1.5) counts[2]++;
      else if (row.carat < 2.0) counts[3]++;
      else if (row.carat < 2.5) counts[4]++;
      else counts[5]++;
    }

    // Set up the width and height of the entire SVG
    var svg_width = 800;
    var svg_height = 400;

    // Set up margins for our plot area
    var plot_left_margin = 30;
    var plot_right_margin = 10;
    var plot_top_margin = 30;
    var plot_bottom_margin = 30;

    // Compute the available plot area now that we know the margins
    var plot_width = svg_width - (plot_left_margin + plot_right_margin);
    var plot_height = svg_height - (plot_top_margin + plot_bottom_margin);

    // Sizing and spacing for plot components
    var bar_width = 80;
    var label_height = 12; // Doesn't change the font size, just an estimate
    var label_spacing = 8;

    // Helper function to compute a bar's x position (left edge)
    var bar_x_pos = function(d, i) {
      // Calculate the spacing so we leave the same amount of space between every
      // two bars and on the left and right edges of the plot

      // Figure out how much space we need between our bars
      var num_bars = counts.length;
      var num_bar_gaps = num_bars + 1;
      var gap_size = (plot_width - num_bars * bar_width) / num_bar_gaps;

      // Bar index zero is one bar gap right of the left edge of the plot. Bar 
      // index one is two bar gaps and one bar width to the right.
      var bar_position = bar_width * i + gap_size * (i + 1);

      // Add the plot's left margin and return
      return bar_position + plot_left_margin;
    };

    // Helper function to compute a bar's height
    var bar_height = function(d) {
      // Find the largest count to set the max bar height
      var max_count = d3.max(counts);

      // What fraction of the max count is our current count?
      var fraction = d / max_count;

      // Now scale by the available plot height. The tallest bar should be 100%
      // of the plot height.
      return fraction * plot_height;
    };

    // Helper function to compute a bar's y position (top edge)
    var bar_y_pos = function(d) {
      // Flip the y axis and add the top margin
      return plot_height - bar_height(d) + plot_top_margin;
    };

    // Create an SVG
    var svg = d3.select('body').append('svg')
      .attr('width', svg_width)
      .attr('height', svg_height);

    // Generate our bars
    // "Ideal" rect
    var ideal = cut_quality.map(function(a) {
      return a.cut1;
    });
    var premium = cut_quality.map(function(a) {
      return a.cut2 + a.cut1;
    });
    var verygood = cut_quality.map(function(a) {
      return a.cut3 + a.cut2 + a.cut1;
    });
    var good = cut_quality.map(function(a) {
      return a.cut4 + a.cut3 + a.cut2 + a.cut1;
    });
    var fair = cut_quality.map(function(a) {
      return a.cut5 + a.cut4 + a.cut3 + a.cut2 + a.cut1;
    });
    
       svg.selectAll('rect.fair-bar')
        .data(fair)
        .enter()
        .append('rect')
        .attr('class', 'fair-bar')
        .attr('x', bar_x_pos) // Use the helper function above
        .attr('y', bar_y_pos) // Use the helper function above
        .attr('width', bar_width) // Use the bar width constant
        .attr('height', bar_height); // Use the helper function above

        svg.selectAll('rect.good-bar')
        .data(good)
        .enter()
        .append('rect')
        .attr('class', 'good-bar')
        .attr('x', bar_x_pos) // Use the helper function above
        .attr('y', bar_y_pos) // Use the helper function above
        .attr('width', bar_width) // Use the bar width constant
        .attr('height', bar_height); // Use the helper function above

        svg.selectAll('rect.verygood-bar')
        .data(verygood)
        .enter()
        .append('rect')
        .attr('class', 'verygood-bar')
        .attr('x', bar_x_pos) // Use the helper function above
        .attr('y', bar_y_pos) // Use the helper function above
        .attr('width', bar_width) // Use the bar width constant
        .attr('height', bar_height); // Use the helper function above

        svg.selectAll('rect.premium-bar')
        .data(premium)
        .enter()
        .append('rect')
        .attr('class', 'premium-bar')
        .attr('x', bar_x_pos) // Use the helper function above
        .attr('y', bar_y_pos) // Use the helper function above
        .attr('width', bar_width) // Use the bar width constant
        .attr('height', bar_height); // Use the helper function above

      svg.selectAll('rect.ideal-bar')
        .data(ideal)
        .enter()
        .append('rect')
        .attr('class', 'ideal-bar')
        .attr('x', bar_x_pos) // Use the helper function above
        .attr('y', bar_y_pos) // Use the helper function above
        .attr('width', bar_width) // Use the bar width constant
        .attr('height', bar_height); // Use the helper function above
    



    // Generate our x-axis labels. Here we are searching for text tags with the
    // class x-axis. This allows us to distinguish x-axis labels from other text.
    svg.selectAll('text.x-axis')
      .data(labels)
      .enter()
      .append('text')
      .attr('class', 'x-axis')
      .attr('x', function(d, i) {
        // The middle of the label is just half a bar's width to the right of the bar
        return bar_x_pos(d, i) + bar_width / 2;
      })
      .attr('y', plot_top_margin + plot_height + label_spacing + label_height)
      .attr('text-anchor', 'middle')
      .text(function(d) {
        return d;
      });

    // Add the rotated y-axis title
    svg.append('text')
      .attr('class', 'y-axis')
      .attr('text-anchor', 'middle')
      .attr('transform',
        // Translate and rotate the label into place. This rotates the label
        // around 0,0 in its original position, so the label rotates around its
        // center point
        'translate(' + (plot_left_margin) + ', ' + (plot_height / 2 + plot_top_margin) + ')' +
        'rotate(-90)')
      .text('Number of Diamonds')

    // Add a line along the x-axis
    svg.append('line')
      .attr('class', 'x-axis')
      .attr('x1', plot_left_margin)
      .attr('y1', plot_height + plot_top_margin)
      .attr('x2', plot_width + plot_left_margin)
      .attr('y2', plot_height + plot_top_margin);


       // Adding legend

  var circleClass = ["fair-bar", "good-bar", "verygood-bar", "premium-bar", "ideal-bar"];
  var circleLabel = ["Fair", "Good", "Very Good", "Premium", "Ideal"];
  var legendCircle = svg.selectAll('circle')
    .data(circleClass)
    .enter()
    .append('circle');

 legendCircle.attr('class', function(d) {return d;})
    .attr('r', 10)
    .attr('cx', svg_width - 200)
    .attr('cy', function(d, i) {return 20 + i*30 + 10*2;}); // 5 is the ratdius of the circle
 
 
 svg.selectAll("legend-text")
   .data(circleLabel)
   .enter()
   .append('text')
   .attr('class', 'legend-text')
   .attr('x', svg_width - 200 + 30)
   .attr('y', function(d, i) {return 25 + i*30 + 10*2;})
   .text(function(d) {
    return d;
   })

  svg.append("text")
   .attr('class', 'legend-header')
   .text("CUT QUALITY")
   .attr('x', svg_width - 215)
   .attr('y', 18)



  // Adding value labels
  svg.selectAll('text.value-label')
   .data(counts)
   .enter()
   .append('text')
   .attr('class', 'value-label')
   .attr('x', function(d, i) { return bar_x_pos(d, i) + 35;} )
   .attr('y', function(d) { return bar_y_pos(d) - 10;} )
   .text(function(d) {return d;})
   .attr('text-anchor', 'middle')



  });


 
    



