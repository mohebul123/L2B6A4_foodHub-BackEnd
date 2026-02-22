import app from "./app";
import config from "./config";
// const PORT = 5000;
app.listen(config.port, () => {
  console.log(`Server is running on Port: ${config.port}`);
});
