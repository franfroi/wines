<?php 
class VendorRepository extends Repository{

   
  
        function getOneVendor(Vendor $vendor){
            
            $query="SELECT * FROM vendors WHERE name=:name and upassword=:upassword ";
            $result=$this->connection->prepare($query);
            $result->execute(array(
                "name"=>$vendor->getName(),
                "upassword"=>$vendor->getUpassword()
                             
                ));
            $vendor=$result->fetch(PDO::FETCH_ASSOC);
           
            if(empty($vendor)){
                return false;
            }
            else{
            return new Vendor($vendor);
            }
        } 

        function getVendorid( $vendor){
            
                        $query="SELECT * FROM vendors WHERE id=:id ";
                        $result=$this->connection->prepare($query);
                        $result->execute(array(
                            "id"=>$vendor
                           
                           
                            ));
                        $vendor=$result->fetch(PDO::FETCH_ASSOC);
                       
                        if(empty($vendor)){
                            return false;
                        }
                        else{
                        return new Vendor($vendor);
                        }
                    } 

                    function getVendorall($vendor)  {

                       
                      
                     $query="SELECT distinct categories.id ,categories.name FROM vendorsproduct,products,categories WHERE vendorsproduct.Vendorsid=:id AND vendorsproduct.productsId=products.id and products.categoryId=categories.id ORDER BY categories.id";
                     $result=$this->connection->prepare($query);
                     $result->execute(array(
                         "id"=>$vendor
                         
                        
                        
                         ));

                         $catByVendor=$result->fetchall(PDO::FETCH_ASSOC);
                        
                          if(empty($catByVendor)){
                             return false;
                           
                          }
                          else{

                           
                              foreach ($catByVendor as  $value) {
                               $tab[] =New Category($value);
                               
                              }
                            
                           
                          return $tab;
                          }
                    }  
                    
                   function getproductbycatId($catId,$vendId){

                   
                       $query="SELECT distinct products.id ,products.name FROM vendorsproduct,products WHERE vendorsproduct.Vendorsid=:idVend AND vendorsproduct.productsId=products.id and products.categoryId=:idCat " ;
                       $result=$this->connection->prepare($query);
                       $result->execute(array(
                        "idVend"=>$vendId,
                           "idCat"=>$catId
                           
                          
                          
                           ));
  
                           $ProductbycatId=$result->fetchall(PDO::FETCH_ASSOC);
                          
                            if(empty($ProductbycatId)){
                               return false;
                             
                            }
                            else{
  
                             
                                foreach ($ProductbycatId as  $value) {
                                 $tab[] =New product($value);
                                 
                                }
                              
                             
                            return $tab;
                            }
                      } 
                      
                      function getproductbyId( $produitID){
                        
                                    $query="SELECT * FROM products WHERE id=:id ";
                                    $result=$this->connection->prepare($query);
                                    $result->execute(array(
                                        "id"=>$produitID
                                       
                                       
                                        ));
                                    $produitID=$result->fetch(PDO::FETCH_ASSOC);
                                   
                                    if(empty($produitID)){
                                        return false;
                                    }
                                    else{
                                    return new Product($produitID);
                                    }
                                } 
            
}