// Load data based on user selection
document.getElementById('datasetSelect').addEventListener('change', function () {
    var selectedDataset = this.value;
    loadData(selectedDataset);
});

// Initial load with default dataset
loadData('stateDeath'); // Change to 'stateAffected' if you want the other dataset

function loadData(dataset) {
    // Use Ajax to fetch data based on the selected dataset
    d3.csv('path/to/your/' + dataset + '_data.csv').then(function (data) {
        // Process the data and create the Treemap
        createTreemap(data);
    });
}

function createTreemap(data) {
    // Use D3.js to create the Treemap
    // Adapt this code based on your dataset structure
    // Here, I assume your CSV has 'category', 'value', and 'color' columns
    var width = 800;
    var height = 500;

    var treemap = d3.treemap()
        .size([width, height])
        .padding(1);

    var root = d3.hierarchy({ children: data })
        .sum(function (d) { return d.value; });

    treemap(root);

    d3.select("#treemap-container")
        .selectAll("div")
        .data(root.leaves())
        .enter().append("div")
        .attr("class", "treemap-node")
        .style("left", function (d) { return d.x0 + "px"; })
        .style("top", function (d) { return d.y0 + "px"; })
        .style("width", function (d) { return d.x1 - d.x0 + "px"; })
        .style("height", function (d) { return d.y1 - d.y0 + "px"; })
        .style("background-color", function (d) { return d.data.color; })
        .text(function (d) { return d.data.category; });
}
