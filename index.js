(function () {
    // svg canvas - this will be used to draw topology
    var topology = require('./js/helpers/topology');
    var d3 = require('d3');
    var svg = d3.select("#draw")
        .append("svg")
        .attr("width", SETTINGS.DRAWING_CANVAS.WIDTH)
        .attr("height", SETTINGS.DRAWING_CANVAS.HEIGHT);

    // Creating an instance of toplogy
    var topo = new topology();

    topo.init(svg);

    setTimeout(function () {
        topo.triggerAnimateEvent(svg);
    }, 1000);

    module.exports = function () {
        return topology;
    }
})();
