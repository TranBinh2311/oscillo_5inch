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

// $(".toggle-chart-table-2").on("click", function () {
//   if ($(this).is(":checked")) {
//     $(".toggle-chart-table-item-2").hide();
//     $("#" + $(this).attr("data-target-2")).show();
//   }
// });


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
