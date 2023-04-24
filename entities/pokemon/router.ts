import express from 'express'
import { auth } from '../../mdw.js'
import {tryCatch} from '../services.js'
import { createPokemon, listPokemonNameType, pokemonById, removePokemon, patchPokemon, updatePokemon } from './controller.js'

const router = express.Router();

router.get("/", tryCatch(listPokemonNameType, ["query"]))
router.get("/:id", tryCatch(pokemonById, ["params.id"]))
router.post("/", auth, tryCatch(createPokemon,["body", "token"]))
router.delete("/:id", tryCatch(removePokemon, ["params.id"]));
router.put("/:id", tryCatch(updatePokemon, ["params.id", "body"]));
router.patch("/:id",tryCatch(patchPokemon, ["params.id", "body"]));

export default router