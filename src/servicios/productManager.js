// const fs = require('fs');
import fs from 'fs'

class productManager{
    constructor(){
        this.product = []
        this.id = 0
        this.path = './files'
        this.fileName = this.path + '/jsonProductos.json'
    }

    addProduct = async(title, description, price, thumbnail, code, stock) =>{
        //crea la carpeta file
        await fs.promises.mkdir(this.path, {recursive: true})
        //agrego un producto
        if(!(title, description, price, thumbnail, code, stock)){
            console.log("Falta informacion")
        }
        else if (this.product.find((prod) => prod.code === code)) {
            console.log("El codigo del producto ya existe")
        }else{
            const prodAdd = {title, description, price, thumbnail, code, stock,  id: this.id++}
            this.product.push (prodAdd)
            console.log("Agrego Producto")
        }
        await fs.promises.writeFile(this.fileName,JSON.stringify(this.product))
        
    }   

    
    getProduct = async () =>{
        let InfoJson = await fs.promises.readFile(this.fileName, 'utf-8')
        console.log(InfoJson)
        let InfoParse = await JSON.parse(InfoJson)

        return InfoParse
        
    }
    getProductById= async(id) =>{
        let InfoJson = await fs.promises.readFile(this.fileName, 'utf-8')
        let InfoParse = await JSON.parse(InfoJson)

        const busquedaId = InfoParse.find(prod=> prod.id === id)
        console.log(busquedaId)
        return busquedaId ?? 'No se encontro el producto'
    }

    deleteProduct = async(id) =>{
        let InfoJson = await fs.promises.readFile(this.fileName, 'utf-8')
        let InfoParse = await JSON.parse(InfoJson)
        const busquedaId = InfoParse.filter(prod=> prod.id !== id)
        await fs.promises.writeFile(this.fileName, JSON.stringify(busquedaId))
        

    } 
}
const product = new productManager()
// product.getProductById(0)
// product.deleteProduct(0)
// product.getProduct()
product.addProduct("mouse","xd", "4000", 'thumbnail',  "18",  "55");
export default productManager