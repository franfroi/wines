<?php
class Product extends Model implements JsonSerializable {
    
    private $name;
    private $prix;
    private $categoryId;
  
    
    function setName($name) { $this->name = $name; }
    function getName() { return $this->name; }
    function setPrix($prix) { $this->prix = $prix; }
    function getPrix() { return $this->prix; }
   
    
    function setCategoryId($categoryId) { $this->categoryId = $categoryId; }
    function getCategoryId() { return $this->categoryId; }

  
    
    
    
     function  jsonSerialize(){
         return [
             "id"=>$this->id,
             "name"=>$this->name,
             "prix"=>$this->prix,
             "categoryId"=>$this->categoryId
            
           
         ];

     }

    

     
    }