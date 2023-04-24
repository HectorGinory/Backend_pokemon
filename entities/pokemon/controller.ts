import Pokemon from "./model.js"

export const listPokemonNameType = async (query) => {
    let data
    if((Object.keys(query).length === 0)) {
        data = await findAllPokemon()
    } else {
        data = queryPokemon(query)
    }
    return data
}

const findAllPokemon = () => Pokemon.find({},{"name":1, "type":1, "trainer": 1}).populate('trainer')

const queryPokemon = (query) => {
    return Pokemon.find({"name": new RegExp(query.name, 'i')},{"name":1, "type":1})
}

export const pokemonById = async (id) => {
    const data = await Pokemon.findOne({"_id": id})
    if(!data) throw new Error('NOT_FOUND')
    return data
}

export const createPokemon = async (pokemon, token) => {
    checkNewPokemon(pokemon)
    pokemon.trainer = token.id
    const newPokemon = new Pokemon(pokemon)
    await newPokemon.save()
    return await findAllPokemon()
}

const checkNewPokemon = (pokemon) => {
    if(!pokemon.name || !pokemon.type || !pokemon.details) {
        throw new Error('INFO_INCOMPLETED')
    }
}
export const removePokemon = async (id) => {
    if(!await Pokemon.findOne({"_id": id})) throw new Error('NOT_FOUND')
    await Pokemon.deleteOne({"_id": id})
    return await findAllPokemon()
}

export const patchPokemon = async (id, pokemon) => {
    pokemon.updatedAt = new Date()
    const newPokemon = Pokemon.findOneAndUpdate({"_id": id}, pokemon)
    if(!newPokemon) throw new Error('NOT_FOUND')
    return newPokemon
}

export const updatePokemon = (id, pokemon) => {
    checkNewPokemon(pokemon)
    patchPokemon(id, pokemon)
}