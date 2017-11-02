import { Product } from "./Product";
import { Category } from "./Category";
import { Vendor } from "./Vendor";
import { APIService  } from "./APIService";
 
export class App {

    public $form: JQuery;
    public $nameVendor: JQuery;
    public $upasswordVendor: JQuery;
    public $products: JQuery;
    public $oneproduct: JQuery;
    public $button_deconnexion: JQuery;


    public $errorName: JQuery;
    public $errorPassword: JQuery;
    public $errorVendor: JQuery;


    private  currentVendor:Vendor;
   
    constructor(){

        this.$form = $("#form");
        this.$nameVendor=$("#name");
        this.$upasswordVendor = $("#upassword");
        this.$products = $("#products");
        this.$oneproduct= $("#oneproduct");


        this.$button_deconnexion=$("#button_deconnexion");
        //error
        this.$errorName=$("#errorName");
        this.$errorPassword=$("#errorPassword");
        this.$errorVendor=$("#errorVendor");
        
    }

    getCurrentVendor():Vendor {
        return this.currentVendor;
    }

    setCurrentVendor( vendor:Vendor ){
        this.currentVendor = vendor;
    }
   

    CheckError():any{
        let nameError:string=this.$nameVendor.val() as string;
        let passwordError:string=this.$upasswordVendor.val() as string;

        let name:boolean=true;
        let  password:boolean=true;

        if (nameError.length<3){
            this.$errorName.show();
            name = false;
        }
        else{
            this.$errorName.hide();
            name = true;
        }

        if (passwordError.length<3){
            this.$errorPassword.show();
            password = false;
          
        }
        else  {
            this.$errorPassword.hide();
             password = true;
          
        }

        
         if (name==true && password==true){
            return true;
        }
         return false;
       
       
       

    }

    GetOneVendor(vendor:Vendor):void{
        
        var api:APIService = APIService.getService();
        let OneVendor:Promise<any> = api.getVendor(vendor);
       
        OneVendor
            .then(( OneVendor ) => {
                if (OneVendor.success==true){
                    console.log(OneVendor)
              let vendor=new Vendor(OneVendor.vendor.name,OneVendor.vendor.upassword)
              this.currentVendor=vendor;
              this.currentVendor.setID(OneVendor.vendor.id);
               console.log(this.currentVendor);
               
                
                
              //passe page 2
              this.$form.hide();
              this.GetallByvendorId( this.currentVendor);
              $("#Page").slideUp("slow");
              $("fieldset").hide();
            
             $("#cat").fadeIn(500);
              this.$button_deconnexion.show();
            }

            else this.$errorVendor.show();

            })
            .catch((error) => {
                console.log(error);
            })

    }

    GetallByvendorId(vendor:Vendor):void{

var api:APIService = APIService.getService();
let allOnVendor:Promise<any> = api.Getall( vendor);
console.log(vendor.getId());
allOnVendor
    .then(( allOnVendor ) => {
        
      
      
       console.log(allOnVendor);
       for(let cat of allOnVendor.Catvendor ){
           
           let categories:Category =new Category(cat.id,cat.name)
           categories.display($("#cat"));
       }

      //passe page 2
     
    })
    .catch((error) => {
        console.log(error);
    })
    }
  

    getProductbyCat(idCat:number,idVend:number):void{
        var api:APIService = APIService.getService();
        let product:Promise<any> = api.GetProduct( idCat,idVend);
        //console.log(vendor.getId());
        product
            .then(( data ) => {
                
              
              
               console.log(data.Catproduct);
                for(let prod of data.Catproduct){
                   
                    let products:Product =new Product(prod.id,prod.name,prod.prix,prod.categoryId)
                   products.display( this.$products);
                }
        
              //passe page 2
             
            })
            .catch((error) => {
                console.log(error);
            })
            }

            getProductByID(data:number):void{
                var api:APIService = APIService.getService();
                let product:Promise<any> = api.GetoneProduct( data);
                product
                .then(( data ) => {
                    
                  
                  
                   console.log(data.productID);

                   let theProduct=data.productID;
                   let product:Product =new Product(theProduct.id,theProduct.name,theProduct.prix,theProduct.categoryId)
                   product.displayoneProduct( this.$oneproduct);
                  
            
                  //passe page 2
                 
                })
                .catch((error) => {
                    console.log(error);
                })
                }
}
