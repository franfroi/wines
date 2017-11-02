import { Model } from "./Model";
export class Category extends Model {

    protected $dom:JQuery;
    private name: string;

    constructor(id:number, name:string ){
        super(id);
      
        this.name = name;
      
    }

    getName(): string {
        return this.name;
    }

    display($parent: JQuery): void {
      // console.log(this.name);
        // let id:number =  this.id;
        let div: string = "<div class=' container-cat "+this.name+" ' data-category='"+this.id+"'>"+this.name+"" ;
            div+="<br><img src='img/vin.png' class='boutVin'></div>"
        this.$dom = $( div );
        $parent.append( this.$dom );

       
    }



}