<?php
//bddmanager va contenir les instances repository

class Bddmanager{
    // private $CategoryRepository;
    // private $ProductRepository;
    private $VendorRepository;

    function __construct(){
        // $this->CategoryRepository=new CategoryRepository();
        // $this->ProductRepository=new ProductRepository();
        $this->VendorRepository=new VendorRepository();

    }

    // function getCategoryRepository(){
    //     return $this->CategoryRepository;
    // }
    // function getProductRepository(){
    //     return $this->ProductRepository;
    // }
    function getVendorRepository(){
        return $this->VendorRepository;
    }
}