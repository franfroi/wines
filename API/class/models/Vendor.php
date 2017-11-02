<?php
class Vendor extends Model implements JsonSerializable {
  
    private $name;
    private $upassword;
    
    function setName($name) { $this->name = $name; }
    function getName() { return $this->name; }
   
    function setUpassword($upassword) { $this->upassword = $upassword; }
    function getUpassword() { return $this->upassword; }
    
    
    
    
     function  jsonSerialize(){
         return [
             "id"=>$this->id,
             "name"=>$this->name,
             "upassword"=>$this->upassword
            
           
         ];

     }

    

     
    }