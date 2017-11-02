export abstract class Model {
    
        protected id: number;
        protected $dom: JQuery;
    
        constructor( id:number ){
            this.id = id;
        }
    
        getId(): number {
            return this.id;
        }
    
        get$Dom(): JQuery{
            return this.$dom;
        }
        setID(id:number):void{
            this.id=id;
        }
    
        //!Important
        abstract display( $parent: JQuery ): void;
    
    }