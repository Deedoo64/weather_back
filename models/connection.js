const mongoose = require("mongoose");

const db_name = "weather";
const connectionString = `mongodb+srv://didier:.didier@cluster1.ffivh9w.mongodb.net/${db_name}`;

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log(`Database "${db_name}" connected`))
  .catch((error) => console.error(error));
