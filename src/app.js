import  express  from "express";


const app = express();
const port = 3000;

app.get('/',(req,res)=>{
    res.status(200).send("Hola mundo") 
})  

app.listen(port, ()=>{
    console.log(`la aplicacion esta escuchando en el puerto ${port}`) 
})


    

