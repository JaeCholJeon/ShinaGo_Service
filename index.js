const express = require("express"),
  http = require("http"),
  cors = require("cors"),
  bodyParser = require("body-parser");
const app = express();
const port = 8080;
var router = express.Router();
app.use(cors());
app.set("port", process.env.PORT || port);
app.use(bodyParser.json());
app.all("/", function(req, res) {
  res.send("shinago Project");
  console.log("home");
});
router.route("/cardlist").post((req, res) => {
  res.send("POST Card Product Lists");
  console.log(req.body);
});
router.route("/user").get((req, res) => {});
app.use(router);
http.createServer(app).listen(app.get("port"), () => {
  console.log(`Api  Server Start on ` + port);
});
