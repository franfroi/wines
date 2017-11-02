import { Category } from "./Category";
import { Model } from "./Model";

export class Product extends Model {

    private name:string;
    private prix: number;
    private category: Category;
    protected $dom: JQuery;

    constructor( id: number, name:string, prix:number, category: Category ){
        super(id);
        this.name = name;
        this.prix = prix;
        this.category = category;
    }

    getCategory(): Category {
        return this.category;
    }

    display( parent: JQuery ): void {

        // let category_name:string = this.category.getName();
        // let id:string =  category_name + this.id;
        // let data_id: number = this.id;
        let div: string = "<div id='"+this.id+"' class='item "+this.category+"'  data-product="+this.id+" >"+this.id+" "+this.name+"</div>";

        this.$dom = $( div );
        parent.append( this.$dom );

    }
    displayoneProduct( parent: JQuery ): void {
       console.log(this.prix);
        let div: string = "<div id='"+this.id+"'  data-product="+this.id+" > " +this.name+"";
        div+="<br><h1>"+this.prix+" €</h1></div>"
                parent.html("");
                this.$dom = $( div );
                parent.show();
                parent.append( this.$dom );
            }
}