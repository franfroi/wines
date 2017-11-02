import { Product } from "./Product";
import { Model } from "./Model";

export class Vendor extends Model {
   
    protected $dom: JQuery;
    private name: string;
    private password: string;

    private products: Product[];

    constructor(name:string,password:string){
        super(0);//id = 0 en super
        this.name = name;
        this.password = password;
        //this.products = products;
    }
    getName(): string {
        return this.name;
    }
    getPassword(): string {
        return this.password;
    }
  
    removeProductById( id:number ){

        for( let key in this.products ){

            let product: Product = this.products[key];
            if( product.getId() == id ){
                let nkey:number = parseInt( key );
                this.products.slice( nkey, 1 );
                return;
            }

        }

    }

    getProducts(): Product[] {
        return this.products;
    }

    addProduct( product: Product ): void{
        this.products.push( product );
    }

    removeProduct( product: Product ): void{

        for( let key in this.products ){

            let vproduct: Product = this.products[key];

            if( vproduct.getId() == product.getId() ){
                this.products.splice( parseInt(key), 1 );
            }
            return;
        }

    }

    display($parent: JQuery): void {
        
        let div: string = "<div class='vendor' id='vendor" + this.id + "' data-vendor='" + this.id + "' >";
        div += "<a href='detail'>";    
        div += this.name + "</a></div>";
            
        this.$dom = $( div );
        $parent.append( this.$dom );

    }


}