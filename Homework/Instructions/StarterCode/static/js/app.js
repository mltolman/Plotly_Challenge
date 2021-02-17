// Build Metadata work on first
function buildMeta(sample) {
    var selMeta = d3.select("#sample-metadata");
    // pannel.html
    function clearText() {
        document.getElementById("sample-metadata").innerHTML = '';
    };
    clearText();
    d3.json("samples.json").then((data) => {
        var dropdownMenu = d3.select("#selDataset");
        var dataset = dropdownMenu.property("value")
        var meta_samp = data.metadata;
        var metaSampResults = meta_samp.filter(x => x.id == sample);
        var meta = metaSampResults[0];
        var samp_names = data.names;
        console.log(meta);

        //
        Object.entries(meta).forEach(function([key, value]) {
            selMeta.append("p").text(`${key}: ${value}`);
            
        });

        

        var first_samp = meta_samp[0];
        console.log(first_samp);
        
        

        
    });
}



// Build Chart
function buildChart(chart1) {
    // var selChart = d3.select("#bar")

    d3.json("samples.json").then((data) => {
        
        // Grab values from the data and json object to build the plots
        var samps = data.samples;
        var sampResults = samps.filter(x => x.id == chart1);
        var samp = sampResults[0];
        console.log(samp);

        var otu_id = samp.otu_ids;
        var otuLables = samp.otu_labels;
        var samp_values = samp.sample_values;

        console.log(samp_values, otuLables)
        

        
        // Check that the data is correct
        // console.log("OTU IDS:");
        // console.log(otu_top_10);
        // console.log("Samples")
        // console.log(samp_vals_top10);
        
        
        
        // Build Chart
        var trace1 = {
            y: otu_id.slice(0,10).map(otus => `OTU ${otus}`).reverse(),
            x: samp_values.slice(0,10).reverse(),
            text: otuLables.slice(0,10).reverse(),
            type:'bar',
            orientation:'h'
        };

        var chartData = [trace1];

        var layout = {
            yaxis: {
                title: "OTU ID"  
            },
            xaxis: {
                title: "Samples"
            }
        };
        Plotly.newPlot("bar", chartData, layout);
    
    
    
       var bubbbleData = {
           x: otu_id,
           y: samp_values,
           text: otuLables,
           mode: 'markers',
           marker: {
               color: otu_id,
               size: samp_values
           }
       };

       var bubData = [bubbbleData];

       var bubbleLayout = {
           title: 'OTU ID vs Sample Value',
           height: 500,
           width: 1000

       };

       Plotly.newPlot("bubble", bubData, bubbleLayout);
    
    });

}







function init() {
    var selector = d3.select("#selDataset");
    

    d3.json("samples.json").then((data) => {
        var samp_val = data.names;

        samp_val.forEach(function (samp) {
            selector.append("option").text(samp).property("value");
            if (samp === data.metadata.id) {
                d3.select("#sample-metadata").append("p").text(data.metadata);
            }
        });

        var first_samp_val = samp_val[0];
        // console.log(first_samp_val);

        //call build metadata
        buildMeta(first_samp_val);

        // call build chart
        buildChart(first_samp_val);


    });

}



function changeOption(new_sample) {
    //build chart with new_samp
    
    
    buildChart(new_sample);

     

    //build metadata with new_samp

    buildMeta(new_sample);
    // selecting = parseInt(d3.select("#selDataset").node().value);

    
    // d3.json("samples.json").then((data) => {
    //     var new_sample = data.names;
    //     var new_ids = data.metadata;

        
    //     new_ids.forEach(function (sample) {
    //         // selecting.append("option").text(sample).property("value", data.metadata);
    //         if (sample.id === selecting) {
    //             // d3.select("#sample-metadata").text(sample(JSON.stringify(sample.id));
    //             d3.select("#sample-metadata").text(`ID: ${sample.id} Ethnicity: ${sample.ethnicity} Gender: ${sample.gender} Age: ${sample.age} Location: ${sample.location} Bbtype: ${sample.bbtype} Wfreq: ${sample.wfreq}`);
                
    //             buildChart(selecting);
    //         }
            
    //     });
    //     // var dropdownMenu = d3.select("#selDataset");
    //     // var dataset = dropdownMenu.property("value");
    //     // var datas = [];
        

    // // if (dataset === new_sample) {
    // //     d3.select("#sample-metadata").append("p").text(data.metadata);
    // // }
    
    // });
    
    


}
d3.selectAll("#selDataset").on("change", changeOption);



// function updateInfo() {
//     // var newSample = d3.select("#selDataset");
//     var sel_new_meta = d3.select("#sample-metadata");
   
//     d3.json("samples.json").then((data) => {
//         var new_samp = data.names;

//         var new_meta = data.metadata;

//         // if (new_samp === data.metadata.id) {
//         //     sel_new_meta.append("#sample-metadata").text(new_meta);

//         // }
//         // else {
//         //     sel_new_meta.append("#sample-metadata").text('');
//         // }


//     });
   

    
    
// }

init();