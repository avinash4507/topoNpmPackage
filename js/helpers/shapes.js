// Shapes.js : This file describes the shapes drawing function with their attributes respectively.
// TODO: Discuss the standarad format for writing comment for shapes.js file.

// drawLib function is used in order to display various elements of topology.
var d3 = require('d3');
var SETTINGS = require('../js/settings')
var drawLib = function () {
};

drawLib.prototype = (function () {
  // function to draw a line
  var drawLine = function (links) {
    var lineAttributes = links
      .attr("x1", function (d) { return d.x1; })
      .attr("y1", function (d) { return d.y1; })
      .attr("x2", function (d) { return d.x2; })
      .attr("y2", function (d) { return d.y2; })
      .attr("class", function (d) { return d.className; })
      .style("stroke", function (d) { return d.stroke; })
      .attr("stroke-width", function (d) { return d.strokeWidth; })
      .attr("stroke-opacity", function (d) { return d.strokeOpacity; });
  },

    // function to draw a circle
    drawCircle = function (nodes) {
      var nodeAttributes = nodes
        .attr("cx", function (d) { return d.x_axis; })
        .attr("cy", function (d) { return d.y_axis; })
        .attr("r", function (d) { return d.radius; })
        .style("fill", function (d) { return d.color; })
        .attr("stroke", SETTINGS.COLOR.BLACK);
    },

    // function that display the node text
    setNodeLabel = function (labels) {
      var labelAttributes = labels
        .text(function (d) { return d.name })
        .attr("x", function (d) { return d.x; })
        .attr("y", function (d) { return d.y; });
    };

  module.exports = function () {
    return {
      drawLine: drawLine,
      drawCircle: drawCircle,
      setNodeLabel: setNodeLabel
    }
  }
})();
