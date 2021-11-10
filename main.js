const wifiElement = document.querySelector("#hanldeWifi");
const wifi = document.querySelector("#wifi");

const handleClick = () => {
  if (wifi.style.display === "block") {
    wifi.style.display = "none";
  } else wifi.style.display = "block";
};

wifiElement.addEventListener("click", handleClick);

$(".toggle-chart-table").on("click", function () {
  if ($(this).is(":checked")) {
    $(".toggle-chart-table-item").hide();
    $("#" + $(this).attr("data-target")).show();
  }
});

$(".toggle-chart-table-2").on("click", function () {
  if ($(this).is(":checked")) {
    $(".toggle-chart-table-item-2").hide();
    $("#" + $(this).attr("data-target-2")).show();
  }
});


var item_display = 0;

$(".list .item").on("click", function () {
        //$(".list .item").removeClass("green").removeClass("active");
    item_display = $(".list .item.green").length;

    if(item_display != 2 || $(this).hasClass('green')){

        $(this).toggleClass("green");

        $(this).find(".notifi").toggle();
    }
    
    item_display = $(".list .item.green").length;

    if(item_display >= 2){
        $('.cpu_chart_panel').show();
    }
    else{

        if(item_display == 1){
            $('#cpu_chart_panel2').hide();
            $('#cpu_chart_panel1').show();
        }
        else
            $('.cpu_chart_panel').hide();
    }
});
$(".opensection").on("click", function () {
  $(this).toggleClass("active");

  var element = $(this).attr("data-target");

  if ($(this).hasClass("active")) {
    $("." + element)
      .show()
      .css("visibility", "visible");
  } else {
    //$("." + element).css("visibility", "hidden");
  }
});
var chart2 = c3.generate({
  bindto: "#guage_cpu",
  title: {
    text: "Lần đo 1",
  },
  data: {
    columns: [["Lần đo 1", 0]],
    type: "gauge",
    onclick: function (d, i) {
      console.log("onclick", d, i);
    },
    onmouseover: function (d, i) {
      console.log("onmouseover", d, i);
    },
    onmouseout: function (d, i) {
      console.log("onmouseout", d, i);
    },
  },
  gauge: {
    min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
    max: 100, // 100 is default
  },
  color: {
    pattern: ["#60B044", "#F6C600", "#F97600", "#FF0000"], // the three color levels for the percentage values.
    threshold: {
      values: [],
    },
  },
  size: {
    height: 150,
  },
});
var chart3 = c3.generate({
  bindto: "#guage_ram",
  title: {
    text: "Lần đo 2",
  },
  data: {
    columns: [["Lần đo 2", 0]],
    type: "gauge",
    onclick: function (d, i) {
      console.log("onclick", d, i);
    },
    onmouseover: function (d, i) {
      console.log("onmouseover", d, i);
    },
    onmouseout: function (d, i) {
      console.log("onmouseout", d, i);
    },
  },
  gauge: {
    //        label: {
    //            format: function(value, ratio) {
    //                return value;
    //            },
    //            show: false // to turn off the min/max labels.
    //        },
    //    min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
    //    max: 100, // 100 is default
    //    units: ' %',
    //    width: 39 // for adjusting arc thickness
  },
  color: {
    pattern: ["#60B044", "#F6C600", "#F97600", "#FF0000"], // the three color levels for the percentage values.
    threshold: {
      //            unit: 'value', // percentage is default
      //            max: 200, // 100 is default
      values: [30, 60, 90, 100],
    },
  },
  size: {
    height: 150,
  },
});
var chart4 = c3.generate({
  bindto: "#guage_3",
  title: {
    text: "Lần đo 3",
  },
  data: {
    columns: [["Lần đo 3", 0]],
    type: "gauge",
    onclick: function (d, i) {
      console.log("onclick", d, i);
    },
    onmouseover: function (d, i) {
      console.log("onmouseover", d, i);
    },
    onmouseout: function (d, i) {
      console.log("onmouseout", d, i);
    },
  },
  gauge: {
  },
  color: {
    pattern: ["#60B044", "#F6C600", "#F97600", "#FF0000"], // the three color levels for the percentage values.
    threshold: {
      values: [],
    },
  },
  size: {
    height: 150,
  },
});
var chartcpu1 = c3.generate({
  bindto: "#cpu1",
  padding: {
    left: 50,
    right: 0,
  },
  point: {
    show: false,
  },
  grid: {
    x: {
      show: true,
    },
    y: {
      show: true,
    },
  },
  data: {
    columns: [["Lần đo 1"], ["Lần đo 2"], ["Lần đo 3"]],
    connectNull: false,
  },
  axis: {
    x: {
      type: "number",
      label: {
        text: "Time",
        position: "outer-center",
      },
    },
    y: {
      max: 100,
      min: 10,
      label: {
        text: "%",
        position: "outer-middle",
      },
    },
  },
});
var chartcpu2 = c3.generate({
    bindto: "#cpu2",
    padding: {
      left: 50,
      right: 0,
    },
    point: {
      show: false,
    },
    grid: {
      x: {
        show: true,
      },
      y: {
        show: true,
      },
    },
    data: {
      columns: [["Lần đo 1"], ["Lần đo 2"], ["Lần đo 3"]],
      connectNull: false,
    },
    axis: {
      x: {
        type: "number",
        label: {
          text: "Time",
          position: "outer-center",
        },
      },
      y: {
        max: 100,
        min: 10,
        label: {
          text: "%",
          position: "outer-middle",
        },
      },
    },
  });
var clicked = false;

var time_click = 1;

var monitor;

var lando = [];

var tonglando = [[],[]];

var x = 0;

function reset() {
  if (clicked) document.getElementById("start/stop").click();
  clicked = false;

  time_click = 1;

  lando = [];

  tonglando = [[],[]];

  monitor = null;

  chartcpu1.load({
    columns: [
      ["Lần đo 1", 0],
      ["Lần đo 2", 0],
      ["Lần đo 3", 0],
    ],
  });
  chartcpu2.load({
    columns: [
      ["Lần đo 1", 0],
      ["Lần đo 2", 0],
      ["Lần đo 3", 0],
    ],
  });
}

function toggle() {
  if (time_click == 4) return 0;
  if (!clicked == true) {
    clicked = true;
    document.getElementById("btn").innerHTML = "Stop";
    document.getElementById("start/stop").style.backgroundColor = "red";

    lando = ["Lần đo " + time_click];

    tonglando[0].push(lando);
    tonglando[1].push(lando);

    lando = [];

    monitor = setInterval(() => {

      let random = Math.floor(Math.random() * 101);

      tonglando[0][time_click - 1].push(random);

      lando.push(random);

      chartcpu1.load({
        columns: tonglando[0],
      });

      random = Math.floor(Math.random() * 101);

      tonglando[1][time_click - 1].push(random);

      lando.push(random);

      chartcpu2.load({
        columns: tonglando[1],
      });

      var max = Math.max.apply(null, lando);

      if (time_click == 1)
        chart2.load({
          columns: [["Lần đo 1", max]],
        });
      if (time_click == 2)
        chart3.load({
          columns: [["Lần đo 2", max]],
        });
      if (time_click == 3)
        chart4.load({
          columns: [["Lần đo 3", max]],
        });
    }, 500);
  } else {
    clearInterval(monitor);
    clicked = false;
    x = 0;
    document.getElementById("btn").innerHTML = "Start";
    document.getElementById("start/stop").style.backgroundColor = "#4caf50";
    time_click++;
  }
}
