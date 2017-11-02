import {Product} from './Product';
import {Vendor} from './Vendor';
export class APIService {
    
        private static instance: APIService = null;
        private url:string = "http://localhost/ProjetVin/API/";
    
        static getService(): APIService {
    
            if( !APIService.instance )
                APIService.instance = new APIService();
    
            return APIService.instance;
        }
    
        private constructor(){}
    
        getVendor($vendor:Vendor): Promise<{}> {
            
            return new Promise((resolve, reject) => {


                $.ajax({
                    url: this.url + "vendor",
                    method : "POST",
                    dataType : "json",
                    
                    data : {
                    
                     name : $vendor.getName(),
                     password : $vendor.getPassword(),
                                         
                    },
                    success: ( vendor: {} ) => {
                        resolve( vendor );
                    },
                    error: ( error ) => {
                        reject( error );
                    }
                });
            })
    
        }

        Getall($vendor:Vendor): Promise<{}> {
            
            return new Promise((resolve, reject) => {
console.log($vendor);


                $.ajax({
                    url: this.url + "vendorCat",
                    method : "POST",
                    dataType : "json",
                    
                    data : {
                       
                     vendorId : $vendor.getId(),
                    
                                         
                    },
                    success: ( vendor: {} ) => {
                        resolve( vendor );
                    },
                    error: ( error ) => {
                        reject( error );
                    }
                });
            })
    
        }


        GetProduct(idCat:number,idVend:number): Promise<number> {
            
            return new Promise((resolve, reject) => {



                $.ajax({
                    url: this.url + "ProduitByCat",
                    method : "POST",
                    dataType : "json",
                    
                    data : {
                       
                     catId : idCat,
                    vendId:idVend
                                         
                    },
                    success: ( catProd: number ) => {
                        resolve( catProd );
                    },
                    error: ( error ) => {
                        reject( error );
                    }
                });
            })
    
        }

        GetoneProduct(data:number): Promise<number> {
            
            return new Promise((resolve, reject) => {



                $.ajax({
                    url: this.url + "ProduitByid",
                    method : "POST",
                    dataType : "json",
                    
                    data : {
                       
                     productID : data,
                   
                                         
                    },
                    success: ( productID: number ) => {
                        resolve( productID );
                    },
                    error: ( error ) => {
                        reject( error );
                    }
                });
            })
    
        }
    }