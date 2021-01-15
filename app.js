// Add in all sample IDs from json data as option tag inside select
var selectById = d3.select("select");
d3.json("samples.json").then((data) => {
  data.samples.forEach(function (sample) {
    var option = selectById.append("option");
    option.text(sample.id);
  });
});

// when user changes IDs in the dropdown menu, make all the graphs
function optionChanged(value) {
  d3.json("samples.json").then((data) => {
    var filteredSample = data.samples.filter((sample) => sample.id === value);
    // console.log(filteredSample);
    createBarPlot(filteredSample);
    createBubbleChart(filteredSample);
    data.metadata.forEach((item) => {
      if (item.id.toString() === value) {
        fillDemographicsTable(item);
      }
    });
  });
}

// Create bar plot
function createBarPlot(sample) {
  sample = sample[0];
  // Take first 10 items
  var ids = sample.otu_ids.slice(0, 9);
  var vals = sample.sample_values.slice(0, 9);
  var labels = sample.otu_labels.slice(0, 9);
  // change sort order to match hw requirement
  vals.sort((a, b) => {
    return a - b;
  });
  ids = ids.reverse();
  // change id # to "OTU #"
  ids = ids.map((id) => "OTU " + id);

  var data = [
    {
      y: ids,
      x: vals,
      type: "bar",
      orientation: "h",
      text: labels,
    },
  ];

  Plotly.newPlot("bar", data);
}

function fillDemographicsTable(item) {
  var demId = d3.select("#id");
  var demEth = d3.select("#ethnicity");
  var gender = d3.select("#gender");
  var age = d3.select("#age");
  var location = d3.select("#location");
  var bbtype = d3.select("#bbtype");
  var wfreq = d3.select("#wfreq");

  demId.text("id: " + item.id);
  demEth.text("ethnicity: " + item.ethnicity);
  gender.text("gender: " + item.gender);
  age.text("age: " + item.age);
  location.text("location: " + item.location);
  bbtype.text("bbtype: " + item.bbtype);
  wfreq.text("wfreq: " + item.wfreq);
}

function createBubbleChart(sample) {
  console.log("create bubble chart fired");
  sample = sample[0];
  console.log(sample);
  // Take first 10 items
  var ids = sample.otu_ids.slice(0, 9);
  var vals = sample.sample_values.slice(0, 9);
  var labels = sample.otu_labels.slice(0, 9);
  // change sort order to match hw requirement
  vals.sort((a, b) => {
    return a - b;
  });
  ids = ids.reverse();
  // change id # to "OTU #"
  ids = ids.map((id) => "OTU " + id);

  var data = [
    {
      x: ids,
      y: vals,
      text: labels,
      marker: {
        size: vals,
        color: [
          "red",
          "green",
          "blue",
          "orange",
          "yellow",
          "purple",
          "indigo",
          "violet",
          "black",
          "brown",
        ],
      },
      mode: "markers",
    },
  ];
  Plotly.newPlot("bubble", data);
}
