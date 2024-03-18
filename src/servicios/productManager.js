class productManager{
    constructor(){
        this.product = []
        this.id = 0
    }

    addProduct({title, description, price, thumbnail, code, stock}){
        const product ={title, description, price, thumbnail, code, stock, id: this.id++};
        /* console.log("esto es product", product); */
        const buscar = this.product.find(prod => prod.code === code);
        console.log("esto es buscar", buscar)
        if (buscar) {
            console.log("El elemento ya existe en el array")
        } else {
            this.product.push(product);
            
        }
        console.log("esto es el array", this.product)
    }
    getProduct(){
        return this.product
    }
    getProductById(id){
        const busquedaId = this.product.find(prod => prod.id === id)
        console.log(busquedaId)
        if (busquedaId) {
            console.log(busquedaId)
        } else {
        console.log("Not Found")
        }

        
    }

}
const product = new productManager()
product.addProduct({title:"teclado", description:"xd", price: 4000, thumbnail: 'thumbnail', code: 69, stock: 55})
product.addProduct({title:"teclado", description:"xd", price: 4000, thumbnail: 'thumbnail', code: 79, stock: 55})
product.addProduct({title:"teclado", description:"xd", price: 4000, thumbnail: 'thumbnail', code: 89, stock: 55})
product.getProduct()
product.getProductById(2) 
export default productManager

