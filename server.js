const express = require("express");
const app = express();
const port = 3000;
const searchRoutes = require("./routes/searchRoutes");

app.use(express.json());
app.use("/search", searchRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});