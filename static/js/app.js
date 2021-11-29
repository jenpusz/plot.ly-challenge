// Use D3 to read in samples.json

function buildMetadata(sample) {
    d3.json("data/samples.json").then(function(data) {
        var metadata = data.metadata;
        var resultsArray = metadata.filter(sampleObject => 
            sampleObject.id == sample);
        var result = resultsArray[0];
        var panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(result).forEach(([key, value]) => {
            panel.append("h5").text(`${key}: ${value}`);
        });
    });
}


// create function build charts
function buildbarCharts(sample) {
    d3.json("data/samples.json").then((data) => {
        var samples = data.samples;
        var resultsArray = samples.filter(sampleObject => 
            sampleObject.id == sample);
        var results = resultsArray[0];
        var ids = results.otu_ids;
        var labels = results.otu_labels;
        var values = results.sample_values;
        var y_labels3 = ids.slice(0,10).toString();
        var y_labels2 = y_labels3.split(',');
        var y_labels = y_labels2.map(i=> 'OTU '+i)
    


        var bar_data = [
            {
                x: values.slice(0, 10).reverse(),
                y: y_labels.reverse(),
                text: labels,
                type: 'bar',
                orientation: 'h',        
            }
        ];

      var barLayout = {
        title: "Top 10 Bacteria Found",
        xaxis: {
            tickmode: "linear",
            tick0: 0,
            dtick: 25
        }
        
      };
    
      Plotly.newPlot("bar", bar_data, barLayout);

    });

}

// create function/build the charts
function buildbubbleChart(sample) {
    d3.json("data/samples.json").then((data) => {
        var samples = data.samples;
        var resultsArray = samples.filter(sampleObject => 
            sampleObject.id == sample);
        var result = resultsArray[0];
        var bubbleids = result.otu_ids;
        var bubblelabels = result.otu_labels;
        var bubblevalues = result.sample_values;

    // Create bubble chart

      var bubblelayout = {
        title:'Belly Button Bacteria',
        xaxis: {title: "OTU ID"},
        yaxis: {title: "OTU #"},
    };

      var bubbledata = [
            {
            x: bubbleids,
            y: bubblevalues,
            text: bubblelabels,
            mode: "markers",
            marker: {
                color: bubbleids,
                size: bubblevalues,
                sizeref:0.1,
                sizemode: 'area',
                line: {
                    color:'black', 
                    width:1,
            }
        }
            }
    ];
        Plotly.newPlot("bubble", bubbledata, bubblelayout);

    });

}

function init() {
    // select dropdown element
    var selector = d3.select("#selDataset");
    
    // populate the dropdown options from sample list
    d3.json("data/samples.json").then((data) => {
        var sampleNames = data.names;
        sampleNames.forEach((sample) => {
        selector
            .append("option")
            .text(sample)
            .property("value", sample);
        });
    
        
        const firstSample = sampleNames[0];
        buildbarCharts(firstSample);
        buildbubbleChart(firstSample);
        buildMetadata(firstSample);
    });
    }
    
    function optionChanged(newSample) {
    
    buildbarCharts(newSample);
    buildbubbleChart(newSample);
    buildMetadata(newSample);
    }
    
init();