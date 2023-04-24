import express from 'express';
import routerPokemon from './entities/pokemon/router.js'
import routerUser from './entities/user/router.js'
import mongoose from "mongoose"

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/pokemon').then(()=>{
    console.log('Connected')
}).catch(()=>{
    console.log('Failed to connect')
})

const handleError = (err, req, res, next) => {
    if(err.message === "NOT_FOUND") res.status(404).json()
    if(err.message === "INFO_INCOMPLETED") res.status(400).json()
    res.status(500).json({err: "SERVER_ERROR"})
}

app.use(express.json());
app.use("/pokedex", routerPokemon);
app.use("/user", routerUser);
app.use(handleError)


app.listen(3000, () => console.log("Servidor levantado en 3000"));
