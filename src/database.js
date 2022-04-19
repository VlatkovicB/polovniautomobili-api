import Sequelize from "sequelize"

import { isDevelopment } from "./utils.js"

class Database {
  constructor() {
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

    try {
      this.sequelize = new Sequelize(process.env.DATABASE_URL, options)
    } catch (error) {
      console.log("App failed to connect to datbase - exiting!")
      process.exit(1)
    }

    this.Sequelize = Sequelize
  }

  authenticateDb = async () => {
    await this.sequelize.authenticate()
  }
}

export default new Database()
