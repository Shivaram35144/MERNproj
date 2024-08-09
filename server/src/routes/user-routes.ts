import Router from "express";
import { getAllUsers, userSignup, deleteUser, userLogin} from "../controllers/user-controllers.js";
import { signupValidator, validate, loginValidator } from "../utils/validators.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup);
//to delete existing user using email
userRoutes.delete("/delete/", deleteUser);
userRoutes.post("/login", validate(loginValidator), userLogin);

export default userRoutes;