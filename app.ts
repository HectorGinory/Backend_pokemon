import express from 'express';
import routerPokemon from './entities/pokemon/router.js'
import routerUser from './entities/user/router.js'
import mongoose from "mongoose"
import config from './config.js';

const app = express();

mongoose.connect(config.DDBB!).then(()=>{
    console.log('Connected')
}).catch(()=>{
    console.log('Failed to connect')
})

const handleError = (err, req, res, next) => {
    if(err.message === "NOT_FOUND") res.status(404).json()
    if(err.message === "INFO_INCOMPLETED") res.status(400).json()
    res.status(500).json({err: "SERVER_ERROR"})
}

app.get("/", (req, res) => {
    res.json({message: "Todo funciona"})
})
app.use(express.json());
app.use("/pokedex", routerPokemon);
app.use("/user", routerUser);
app.use(handleError)


app.listen(config.PORT, () => console.log("Servidor levantado en 3000"));
