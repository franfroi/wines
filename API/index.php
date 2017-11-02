<?php
header ("Access-Control-Allow-Origin: * ");
//Autorise certains site (ic tous) a faire des requetes cross domaines
require "flight/Flight.php";
require "autoload.php";



// un vendeur connection
Flight::route("POST /vendor",function(){
    $request = Flight::request();
    $name= $request->data["name"];
    $password= $request->data["password"];
    $vendor=new Vendor();
    $vendor->setName($name);
    $vendor->setUpassword($password);

    $bdd=new Bddmanager();
    $repo=$bdd->getVendorRepository();
    $vendor=$repo->getOneVendor($vendor);
    $statut=[
        "success"=>false,
        "vendor"=>false
    ];
    if ($vendor!=false){
        $statut["success"]=true;
        $statut["vendor"]=$vendor;
    }
    echo json_encode($statut);
    
    
    
});

//recuperer un produit / vendeur by id
Flight::route("GET /vendor/@id",function($id){
   
    $vendor=new Vendor();
    $vendor->setId($id);
    $bdd=new Bddmanager;
    $repo=$bdd->getVendorRepository();
    $vendor=$repo->getVendor($vendor);

    $statut=[
        "success"=>false,
        "vendor"=>false
    ];

    if ($vendor!=false){
        $statut["success"]=true;
        $statut["vendor"]=$vendor;
    }
    echo json_encode($statut);
    
   });
//recuperer cat / vendeur by id
Flight::route("POST /vendorCat",function(){
    $request = Flight::request();
    $vendorId= $request->data["vendorId"];
 
     $bdd=new Bddmanager;
     $repo=$bdd->getVendorRepository();
     $Catvendor=$repo->getVendorall($vendorId);
    
    
    
     $statut=[
         "success"=>false,
         "Catvendor"=>false
     ];
 
     if ($Catvendor!=false){
         $statut["success"]=true;
         $statut["Catvendor"]=$Catvendor;
     }
     echo json_encode($statut); 
     
    });

//recuperer cat / vendeur by id
Flight::route("POST /ProduitByCat",function(){
    $request = Flight::request();
    $catId= $request->data["catId"];
    $vendId= $request->data["vendId"];
    
     $bdd=new Bddmanager;
     $repo=$bdd->getVendorRepository();
     $Catproduct=$repo->getproductbycatId($catId,$vendId);
        
     $statut=[
         "success"=>false,
         "Catproduct"=>false
     ];
 
     if ($Catproduct!=false){
         $statut["success"]=true;
         $statut["Catproduct"]=$Catproduct;
     }
     echo json_encode($statut); 
     
    });

//recuperer product by id
Flight::route("POST /ProduitByid",function(){
    $request = Flight::request();
    $productID= $request->data["productID"];
    
    
     $bdd=new Bddmanager;
     $repo=$bdd->getVendorRepository();
     $Catproduct=$repo->getproductbyId($productID);
        
     $statut=[
         "success"=>false,
         "productID"=>false
     ];
 
     if ($productID!=false){
         $statut["success"]=true;
         $statut["productID"]=$Catproduct;
     }
     echo json_encode($statut); 
     
    });


Flight::start();