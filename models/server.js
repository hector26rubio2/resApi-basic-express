const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.USER_PATH = "/api/users";
    this.AUTH_PATH ='/api/auth'
    this.conectarDB()
    this.middlewares();
    this.routes();
  }
  async conectarDB(){
    await dbConnection();

  }

  middlewares() {
    //*cors
    this.app.use(cors());

    //* lectura y parseo del body
    this.app.use(express.json())
    // * Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.AUTH_PATH, require("../routes/auth"));
    this.app.use(this.USER_PATH, require("../routes/user"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port localhost:${this.port}`);
    });
  }
}

module.exports = Server;
