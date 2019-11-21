const express = require("express"),
  http = require("http"),
  cors = require("cors"),
  mysql = require("mysql"),
  fs = require("fs"),
  SqlToJson = require("sql-to-json"),
  readline = require("readline"),
  request = require("request"),
  bodyParser = require("body-parser");
var host, db, user, passward;
const app = express();
const port = 10101;
var router = express.Router();
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  passward: "wjswocjf20",
  database: "dbown",
  insecureAuth: true
});
connection.connect();
connection.query("SELECT * FROM grp_prdt_gaip_info", function(
  error,
  results,
  fields
) {
  if (error) {
    console.log(error);
  }
  console.log(results);
});
app.use(cors());
app.set("port", process.env.PORT || port);
app.use(bodyParser.json());
app.all("/", function(req, res) {
  console.log("home");
});

router.route("/cardlist").post((req, res) => {
  console.log(req.body);
});

router.route("/user").get((req, res) => {});
router.route("/");
app.use(router);

http.createServer(app).listen(app.get("port"), () => {
  console.log(`Api  Server Start on ` + port);
});
