<?php
class Category extends Model implements JsonSerializable {
    
    private $name;
    //private $category;
  
    
    function setName($name) { $this->name = $name; }
    function getName() { return $this->name; }
   
    // function setCategory($category) { $this->category = $category; }
    // function getCategory() { return $this->category; }
    
    
    
    
     function  jsonSerialize(){
         return [
             "id"=>$this->id,
             "name"=>$this->name
            //  ,
            //  "category"=>$this->category
            
           
         ];

     }

    

     
    }