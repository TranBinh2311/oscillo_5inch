const wifiElement = document.querySelector("#hanldeWifi");
const wifi = document.querySelector("#wifi");

const handleClick = () => {
  if (wifi.style.display === "block") {
    wifi.style.display = "none";
  } else wifi.style.display = "block";
};

wifiElement.addEventListener("click", handleClick);

$('.toggle-chart-table').on('click',function(){
  if ($(this).is(':checked')) {
    $('.toggle-chart-table-item').hide();
    $('#'+$(this).attr('data-target')).show();
  }
})
$('.list .item').on('click',function(){

  $('.list .item').removeClass('green').removeClass('active');

  $(this).addClass('green');

})
$('.opensection').on('click',function(){

  $(this).toggleClass('active');

  var element = $(this).attr('data-target');

  if($(this).hasClass('active')){

    $('.'+element).show().css('visibility','visible');

  }else{

    $('.'+element).css('visibility','hidden');

  }

})
