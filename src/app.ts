import express from "express"
import "reflect-metadata"
import "express-async-errors"
import sessionRoutes from "./routes/session.routes"
import handleError from "./errors/handleErrors"
import userRoutes from "./routes/user.routes"
import postRoutes from "./routes/posts.routes"
import categoryRoutes from "./routes/category.routes"

const app = express()
app.use(express.json())

app.use("/users", userRoutes)
app.use("/session", sessionRoutes)
// app.use("/donations", donationRoutes)
app.use("/posts", postRoutes)
app.use("/category", categoryRoutes)

app.use(handleError)

export default app