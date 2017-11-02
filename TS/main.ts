import { App } from "./App";
//import { Product } from "./Product";
import { Vendor } from "./Vendor";


var app:App = new App();
app.$form.submit(function(event){
    event.preventDefault();
    let name=app.$nameVendor.val() as string;
    let password=app.$upasswordVendor.val() as string;

    //check error
    let chechError:boolean=app.CheckError();
  
    if ((chechError==true)) {
    
    let vendor=new Vendor(name,password);
    app.GetOneVendor(vendor);

    }

});
$(document).on('click', ".container-cat",function(){
app.$products.html("");
let idCat=$(this).data("category") as number;
let idVend=app.getCurrentVendor().getId();
app.getProductbyCat(idCat,idVend);
$("#cat").hide();
$("#button").show();
$("#product-list").show("slow");
$("#products").show();

$("#h2").show();

//console.log(idCat);
});
$("#button").click(function(){
    $(this).hide();
    $("#cat").fadeIn(2000);
    $("#products").slideUp("slow");
    $("#product-list").hide()
    $("#h2").hide();
    $(".closeDiv").hide();
    app.$oneproduct.hide();
});

$(document).on('click', ".item",function(){
   let data= $(this).data("product") as number;
   app.getProductByID(data);
   $(".closeDiv").show();
   console.log(data);
});

$(".closeDiv").click(function(){
   $(this).hide();
    app.$oneproduct.hide();
});

app.$button_deconnexion.click(function(){
    location.reload();
})