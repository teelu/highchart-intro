$(document).ready(function() {
  var Charts = function() {
    this.xyCoordinates = [];
  };

  Charts.prototype.makeAjaxRequest = function () {
    $.ajax({
      context: this,
      type: 'GET',
      url: 'https://www.quandl.com/api/v1/datasets/BTS_MM/RETAILGAS.json?auth_token=E6kNzExHjay2DNP8pKvB',
      success: function(response) {
        var items = response.data;
        console.log(items);
        for (var i = 0; i < items.length; i++) {

          this.xyCoordinates.push({
            x: new Date(items[i][0]),
            y: items[i][1]
          });
        }
          this.graphChart();
      }
    });
  };

  Charts.prototype.graphChart = function () {
    var highchartConfig = {
      title: {
        text: "Average retail gas prices"
      },
      subtitle: {
        text: "Bureau of Transportation statistics (Multimodal)"
      },
      xAxis: {
        type: 'datetime'
      },
      series: [
        {
          name: 'US',
          data: this.xyCoordinates.reverse()
        }
      ]
    }
    $('#chart').highcharts(highchartConfig);
  };

  var newChart = new Charts();
  newChart.makeAjaxRequest();
});