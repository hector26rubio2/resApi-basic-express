const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("conexión exitosa");
  } catch (error) {
    console.log(error);

    //throw new Error("Error conexión con la base de datos");
  }
};
module.exports = {
  dbConnection,
};
