export const BDD:{ 
    categories : { id:number, name:string}[],
    products : { id:number, name: string, categoryId: number }[],
    vendors : { id: number, name: string, products: number[] }[]
 } 
    = {

    categories: [
        {
            id: 1,
            name: "Rouge"
        },
        {
            id: 2,
            name: "Rose"
        },
        {
            id: 3,
            name: "Blanc"
        },
    ],
    products : [
        {
            id : 1,
            name : "bordeaux",
            categoryId : 1
        },
        {
            id : 2,
            name : "rivesalte",
            categoryId : 3
        },
        {
            id : 3,
            name : "champagne",
            categoryId : 2
        }
        ,
        {
            id : 4,
            name : "champagne1",
            categoryId : 1
        }
        ,
        {
            id : 5,
            name : "champagne2",
            categoryId : 1
        }
        ,
        {
            id : 6,
            name : "champagne3",
            categoryId : 1
        }
        ,
        {
            id : 7,
            name : "champagne4",
            categoryId : 1
        }
    ],
    vendors : [
        {
            id: 1,
            name: "Paul",
            products : [ 1, 2 ]
        },
        {
            id: 2,
            name: "Jeremy",
            products : [ 2 ]
        },
        {
            id: 3,
            name: "Stephane",
            products : [ 3 ]
        }

    ]


}