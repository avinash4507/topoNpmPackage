//topology.js: This file describes the formation of topology via connecting various elements of topology. shapes drawing function with their attributes respectively.
//TODO: Discuss the standarad format for writing comment for shapes.js file.


var d3 = require('d3');
var SETTINGS = require('../js/settings');

var topology = function () {
    var path, totalLength;
};

// Function to describe the formation  of topology
topology.prototype = function () {

    // private member
    // displays the data as per updations
    var lineFunction = d3.svg.line()
        .x(function (d) { return d.x; })
        .y(function (d) { return d.y; })
        .interpolate("cardinal");

    // Calculates total length
    // TODO: Researching on best solution.
    // This function is used for calaculating total length and updates the red colored stroke as per requirement
    var _calculateTotalLength = function (svg) {
        var lineData = [{ "x": 300, "y": 150 }, { "x": 450, "y": 200 }];
        path = svg.append("path")
            .attr("d", lineFunction(lineData))
            .attr("stroke", SETTINGS.COLOR.BLACK)
            .attr("stroke-width", SETTINGS.STROKE.WIDTH.SMALL)
            .attr("fill", "none");

        totalLength = path.node().getTotalLength();
    },

        init = function (svg) {
            // Creating the object for drawLib
            var lib = new drawLib();

            // Fetching the data from "topology.json"
            d3.json("./api/topology.json", function (json) {

                // This is used for creating the line/links
                var links = svg.selectAll("line")
                    .data(json.links)
                    .enter()
                    .append("line");

                lib.drawLine(links);

                // This is used for creating the nodes
                var nodes = svg.selectAll("circle")
                    .data(json.nodes)
                    .enter()
                    .append("circle");

                lib.drawCircle(nodes);

                // This is used for getting the text
                var labels = svg.selectAll("text")
                    .data(json.labels)
                    .enter()
                    .append("text");

                lib.setNodeLabel(labels);
            });
        };

    // Bind Events
    // Animations of various lines is being described here.
    triggerAnimateEvent = function (svg) {
        _calculateTotalLength(svg);
        d3.selectAll(".linkClassFifth")
            .transition()
            .duration(2000)
            .ease("linear")
            .attr("stroke-width", SETTINGS.STROKE.WIDTH.LARGE)
            .transition()
            .delay(800)
            .duration(5000)
            .ease("linear")
            .attr("stroke-dasharray", ("3, 3"));

        d3.selectAll(".linkClassThird")
            .transition()
            .duration(2000)
            .ease("linear")
            .attr("stroke-width", SETTINGS.STROKE.WIDTH.SMALL)
            .attr("class", "u-activated-red");

        path
            .style("stroke", SETTINGS.COLOR.RED)
            .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(8000)
            .ease("linear")
            .attr("stroke-dashoffset", 0);
    };

    //public members
    module.exports = function () {
        return {
            init: init,
            triggerAnimateEvent: triggerAnimateEvent
        };
    }
} ();
