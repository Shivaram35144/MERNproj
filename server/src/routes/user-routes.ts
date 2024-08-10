import Router from "express";
import { getAllUsers, userSignup, deleteUser, userLogin, verifyUser, userLogout} from "../controllers/user-controllers.js";
import { signupValidator, validate, loginValidator } from "../utils/validators.js";

import { verifyToken } from "../utils/token-manager.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup);
//to delete existing user using email
userRoutes.delete("/delete/", deleteUser);
userRoutes.post("/login", validate(loginValidator), userLogin);

userRoutes.get("/auth-status", verifyToken, verifyUser);
userRoutes.get("/logout", verifyToken, userLogout);


export default userRoutes;