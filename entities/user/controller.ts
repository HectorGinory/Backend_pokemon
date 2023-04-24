import User from "./model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../../config.js'

export const listUserNameType = async (query) => {
    let data
    if((Object.keys(query).length === 0)) {
        data = await findAllUser()
    } else {
        data = queryUser(query)
    }
    return data
}

const findAllUser = () => User.find({},{"name":1, "email":1})

const queryUser = (query) => {
    return User.find({"name": new RegExp(query.name, 'i')},{"name":1, "type":1})
}

export const userById = async (id) => {
    const data = await User.findOne({"_id": id})
    if(!data) throw new Error('NOT_FOUND')
    return data
}

export const createUser = async (user) => {
    console.log('sadas');
    checkNewUser(user)
    user.password = await bcrypt.hashSync(user.password, config.SALT_ROUND)
    const newUser = new User(user)
    await newUser.save()
    return await findAllUser()
}


export const removeUser = async (id) => {
    if(!await User.findOne({"_id": id})) throw new Error('NOT_FOUND')
    await User.deleteOne({"_id": id})
    return await findAllUser()
}

export const patchUser = async (id, user) => {
    if(!await User.findOne({"_id": id})) throw new Error('NOT_FOUND')
    if(user.password) user.password = await bcrypt.hashSync(user.password, config.SALT_ROUND)
    await User.updateOne({"_id": id}, user)
    return await User.findOne({"_id": id})
}

const checkNewUser = (user) => {
    if(!user.name || !user.password || !user.email) {
        throw new Error('INFO_INCOMPLETED')
    }
}

export const updateUser = async (id, user) => {
    checkNewUser(user)
    patchUser(id, user)
}

export const logInUser = async (user) => {
    const findUser = await User.findOne({email: user.email}).select('+password')
    if(!findUser) throw new Error('NOT_FOUND')
    if(!(await bcrypt.compare(user.password, findUser.password))) throw new Error('NOT_FOUND')
    const token = jwt.sign({email: user.email, id: findUser._id}, config.SECRET)
    return token
}
