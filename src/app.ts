import express from "express"
import "reflect-metadata"
import "express-async-errors"
import sessionRoutes from "./routes/session.routes"
import handleError from "./errors/handleErrors"
import userRoutes from "./routes/user.routes"
import donationRoutes from "./routes/donations.routes"
import postRoutes from "./routes/posts.routes"
import categoryRoutes from "./routes/category.routes"
import swaggerUi from "swagger-ui-express"
import swaggerDocs from "./documentation/swagger.json"

const app = express()
app.use(express.json())

app.use("/users", userRoutes)
app.use("/session", sessionRoutes)
app.use("/donations", donationRoutes)
app.use("/posts", postRoutes)
app.use("/categories", categoryRoutes)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))


app.use(handleError)

export default app