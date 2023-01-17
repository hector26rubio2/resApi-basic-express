const express = require("express");
const cors = require("cors");
class Server {
  constructor() {
    this.app = express();

    this.port = process.env.PORT;
    this.USUARIOS_PATH = "/api/usuarios";
    this.middlewares();
    this.routes();
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
    this.app.use(this.USUARIOS_PATH, require("../routes/user"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port localhost:${this.port}`);
    });
  }
}

module.exports = Server;
