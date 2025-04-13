export interface Category {
    id:string,
    name:string,
    slug:string,
    image:string,
}

export interface Product {
    id:string,
    title:string,
    slug:string,
    price:number,
    description:string,
    category:Category,
    images:string[],
}