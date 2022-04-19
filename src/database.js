import Sequelize from "sequelize"
import { isDevelopment } from "./utils.js"

const options = isDevelopment()
  ? { logging: console.log }
  : {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      logging: false,
    }

const sequelize = new Sequelize(process.env.DATABASE_URL, options)

const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize

export const authenticateDb = async () => {
  await db.sequelize.authenticate()
}

export default db
