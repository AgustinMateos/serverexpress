import  express  from "express";
import ProductManager from "./components/ProductManager.js";


const app=express()
app.use(express.urlencoded({extended:true}))//le permitimos al servidor exprres que si su endopoint es complejo no tenga problema en leelo


const productos=new ProductManager()
const readProducts=productos.readProducts()


app.get("/products",async(req,res)=>{

    let limit=parseInt(req.query.limit)
    if(!limit) return res.send(await readProducts)
    let allPorducts=await readProducts
    let productLimit=allPorducts.slice(0,limit)
res.send(await productLimit)
})
app.get("/products/:id",async(req,res)=>{
      let id =parseInt(req.params.id)//recibe un id por parametro y se guarda en la variable id 
      console.log(id)
      let allPorducts=await readProducts
      let productById=allPorducts.find(product=>product.id === id)
      res.send(productById)
})


const PORT=8080;

const server=app.listen(PORT,()=>{
    console.log(`express por local host${server.address().port}`)
})

server.on("error",(error)=>console.log(`error del servidor ${error}`))