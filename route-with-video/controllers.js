/**
 * Created by postepenno on 13.07.2015.
 */

app.controller("FirstController", function () {
  console.log("First Controller");
})

app.controller("VideoController", function () {
  console.log("Video Controller!");
})

app.controller("GalleryController", function () {
  var vm = this;

  vm.baseUrl = "gallery/img/";

  vm.images = [
    {url:"beer.jpg"},
    {url:"bomba.jpg"},
    {url:"brak.jpg"},
    {url:"bufer.jpg"},
    {url:"comrade.jpg"}
  ]

})