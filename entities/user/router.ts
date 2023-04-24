import express from 'express'
import { auth } from '../../mdw.js'
import {tryCatch} from '../services.js'
import { createUser, listUserNameType, logInUser, patchUser, removeUser, updateUser, userById } from './controller.js';

const router = express.Router();

router.get("/", tryCatch(listUserNameType, ["query"]))
router.get("/:id", tryCatch(userById, ["params.id"]))
router.post("/", tryCatch(createUser,["body"]))
router.delete("/:id", tryCatch(removeUser, ["params.id"]));
router.put("/:id", tryCatch(updateUser, ["params.id", "body"]));
router.patch("/:id",tryCatch(patchUser, ["params.id", "body"]));
router.post("/login", tryCatch(logInUser, ["body"]))

export default router