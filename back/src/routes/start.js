const server = require("./server");
const { sequelize } = require("../DB_connection");
const { saveApiData } = require("../controllers/saveApiData");

sequelize.sync({ force: true }).then(async () => {
  await saveApiData();

  console.log("db conectada");
  //console.log(await saveApiData());
  await saveApiData();
  server.listen(3001, () => {
    console.log("server raised on port 3001");
  });
});
