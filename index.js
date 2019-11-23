const express = require("express"),
  http = require("http"),
  cors = require("cors"),
  mysql = require("mysql"),
  fcm = require('./fcm')
fs = require("fs"),
  //SqlToJson = require("sql-to-json"),
  readline = require("readline"),
  request = require("request"),
  bodyParser = require("body-parser");
var host, db, user, passward;
const app = express();
const port = 10102;
var router = express.Router();

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'PASSWORD',
  database: 'dbown',
  insecureAuth: true
});

app.use(cors());
app.set("port", process.env.PORT || port);
app.use(bodyParser.json());
app.all("/", function (req, res) {
  console.log(req.body);
});

router.route("/grp_prdt_gaip_info/select").post((req, res) => {
  console.log(req.body);
  connection.query("SELECT * FROM grp_prdt_gaip_info where cusno = " + req.body.cusno, function (
    error,
    results,
    fields
  ) {
    if (error) {
      console.log(error);
    }
    console.log(results);
    res.json(200, results);
  });
});

router.route("/grp_prdt_gaip_info/insert").post((req, res) => {
  console.log(req.body);
  connection.query("INSERT INTO grp_prdt_gaip_info values (" + req.body.grpco_cid + ',' + req.body.cusno + ',' + req.body.grpco_c + ',' + req.body.prdt_c + ',' + req.body.prdt_nm +
    ',' + req.body.service_c + ',' + req.body.acno + ',' + req.body.card_no + ',' + req.body.chek_card_yn + ',' + req.body.siljuk_prdt_yn + ',' + req.body.success_yn + ',' +
    req.body.event_yn + ")", function (
      error,
      results,
      fields
    ) {
    if (error) {
      console.log(error);
    }
    console.log(results);
    res.json(200, results);
  });
});

router.route("/grp_prdt_gaip_info/update").post((req, res) => {
  console.log(req.body);

  mainquery = "UPDATE INTO grp_prdt_gaip_info SET success_yn = " + req.body.success_yn

  connection.query(mainquery + " where cusno = " + req.body.cusno + " and grpco_cid = " + req.body.grpco_cid, function (
    error,
    results,
    fields
  ) {
    if (error) {
      console.log(error);
    }
    console.log(results);
    res.json(200, results);
  });
  fcm.sendFcmMessage();
});

router.route("/grp_prdt_jogun_inf/select").post((req, res) => {
  console.log(req.body);
  connection.query("SELECT * FROM grp_prdt_jogun_inf", function (
    error,
    results,
    fields
  ) {
    if (error) {
      console.log(error);
    }
    console.log(results);
    res.json(200, results);
  });
});

router.route("/grp_prdt_jogun_inf/insert").post((req, res) => {
  console.log(req.body);
  connection.query("INSERT INTO grp_prdt_jogun_inf values (" + req.body.grpco_c + ',' + req.body.prdt_c + ',' + req.body.prdt_nm + ',' + req.body.service_c + ',' +
    req.body.jan_jogun + ',' + req.body.ipgeum_jogun + ',' + req.body.jigeub_jogun + ',' + req.body.pyunjan_jogun + ',' + req.body.card_amt_jogun1 + ',' + req.body.card_amt_jogun2 +
    ',' + req.body.card_amt_jogun3 + ',' + req.body.cc_iche_jogun + ',' + req.body.yeungm_jojun + ',' + req.body.age_jojun + ',' + req.body.gyul_acno_jojun + ',' +
    req.body.smore_jojun + ',' + req.body.insuranse_jojun + ',' + req.body.fil_char_jogun1 + ',' + req.body.naver_yn + ',' + req.body.resave_yn + ',' + req.body.chungyak_yn + ',' +
    req.body.mobile_yn + ',' + req.body.recomd_yn + ")", function (
      error,
      results,
      fields
    ) {
    if (error) {
      console.log(error);
    }
    console.log(results);
    res.json(200, results);
  });
});

router.route("/grp_s20_save_inf/select").post((req, res) => {
  console.log(req.body);
  connection.query("SELECT * FROM grp_s20_save_inf where cusno = " + req.body.cusno, function (
    error,
    results,
    fields
  ) {
    if (error) {
      console.log(error);
    }
    console.log(results);
    res.json(200, results);
  });
});

router.route("/grp_s20_save_inf/insert").post((req, res) => {
  console.log(req.body);
  connection.query("INSERT INTO grp_s20_save_inf values (" + req.body.bas_yymm + ',' + req.body.grpco_cid + ',' + req.body.cusno + ',' + req.body.grpco_c + ',' +
    req.body.prdt_c + ',' + req.body.prdt_nm + ',' + req.body.service_c + ',' + req.body.acno + ',' + req.body.chungyak_yn + ',' + req.body.mobile_yn +
    ',' + req.body.recomd_yn + ',' + req.body.resave_yn + ',' + req.body.cc_iche_cnt + ',' + req.body.iche_amt + ")", function (
      error,
      results,
      fields
    ) {
    if (error) {
      console.log(error);
    }
    console.log(results);
    res.json(200, results);
  });
});

router.route("/grp_s20_save_inf/update").post((req, res) => {
  console.log(req.body);

  if (req.body.chungyak_yn == 1) {
    connection.query("UPDATE grp_prdt_gaip_info SET success_yn = 1 where prdt_c = 250700102", function (
      error,
      results,
      fields
    ) {
    if (error) {
      console.log(error);
    }
    console.log(results);
   });
    fcm.sendFcmMessage();
  }

  else if (req.body.chungyak_yn == 0){
    connection.query("UPDATE grp_prdt_gaip_info SET success_yn = 0 where prdt_c = 250700102", function (
      error,
      results,
      fields
    ) {
    if (error) {
      console.log(error);
    }
    console.log(results);
   });
   fcm.sendFcmMessage();
  }

  connection.query("UPDATE grp_s20_save_inf SET chungyak_yn = " + req.body.chungyak_yn +
    " where cusno = " + req.body.cusno, function (
      error,
      results,
      fields
    ) {
    if (error) {
      console.log(error);
    }
    console.log(results);
  });
  connection.query("SELECT * FROM grp_s20_save_inf where cusno = " + req.body.cusno, function (
    error,
    results,
    fields
  ) {
    if (error) {
      console.log(error);
    }
    console.log(results);
    res.json(200, results);

  });
});



  router.route("/grp_naverpay_inf/select").post((req, res) => {
    console.log(req.body);
    connection.query("SELECT * FROM grp_naverpay_inf where cusno = " + req.body.cusno, function (
      error,
      results,
      fields
    ) {
      if (error) {
        console.log(error);
      }
      console.log(results);
      res.json(200, results);
    });
  });

  router.route("/grp_naverpay_inf/insert").post((req, res) => {
    console.log(req.body);
    connection.query("INSERT INTO grp_naverpay_inf values (" + req.body.bas_yymm + ',' + req.body.grpco_cid + ',' + req.body.cusno + ',' + req.body.grpco_c + ',' +
      req.body.prdt_c + ',' + req.body.prdt_nm + ',' + req.body.service_c + ',' + req.body.acno + ',' + req.body.ipgeum_amt + ',' + req.body.naver_yn + ")", function (
        error,
        results,
        fields
      ) {
      if (error) {
        console.log(error);
      }
      console.log(results);
      res.json(200, results);
    });
  });

  router.route("/grp_amanda_inf/select").post((req, res) => {
    console.log(req.body);
    connection.query("SELECT * FROM grp_amanda_inf where cusno = " + req.body.cusno, function (
      error,
      results,
      fields
    ) {
      if (error) {
        console.log(error);
      }
      console.log(results);
      res.json(200, results);
    });
  });

  router.route("/grp_amanda_inf/insert").post((req, res) => {
    console.log(req.body);
    connection.query("INSERT INTO grp_amanda_inf values (" + req.body.bas_yymm + ',' + req.body.grpco_cid + ',' + req.body.cusno + ',' + req.body.grpco_c + ',' +
      req.body.prdt_c + ',' + req.body.prdt_nm + ',' + req.body.service_c + ',' + req.body.cardno + ',' + req.body.card_amt + ")", function (
        error,
        results,
        fields
      ) {
      if (error) {
        console.log(error);
      }
      console.log(results);
      res.json(200, results);
    });
  });

  router.route("/grp_smart_card_inf/select").post((req, res) => {
    console.log(req.body);
    connection.query("SELECT * FROM grp_smart_card_inf where cusno = " + req.body.cusno, function (
      error,
      results,
      fields
    ) {
      if (error) {
        console.log(error);
      }
      console.log(results);
      res.json(200, results);
    });
  });

  router.route("/grp_smart_card_inf/insert").post((req, res) => {
    console.log(req.body);
    connection.query("INSERT INTO grp_smart_card_inf values (" + req.body.bas_yymm + ',' + req.body.grpco_cid + ',' + req.body.cusno + ',' + req.body.grpco_c + ',' +
      req.body.prdt_c + ',' + req.body.prdt_nm + ',' + req.body.service_c + ',' + req.body.cardno + ',' + req.body.card_amt + ")", function (
        error,
        results,
        fields
      ) {
      if (error) {
        console.log(error);
      }
      console.log(results);
      res.json(200, results);
    });
  });

  router.route("/grp_rich_insuranse_inf/select").post((req, res) => {
    console.log(req.body);
    connection.query("SELECT * FROM grp_rich_insuranse_inf where cusno = " + req.body.cusno, function (
      error,
      results,
      fields
    ) {
      if (error) {
        console.log(error);
      }
      console.log(results);
      res.json(200, results);
    });
  });

  router.route("/grp_rich_insuranse_inf/insert").post((req, res) => {
    console.log(req.body);
    connection.query("INSERT INTO grp_rich_insuranse_inf values (" + req.body.bas_yymm + ',' + req.body.grpco_cid + ',' + req.body.cusno + ',' + req.body.grpco_c + ',' +
      req.body.prdt_c + ',' + req.body.prdt_nm + ',' + req.body.service_c + ',' + req.body.jan + ',' + req.body.ds_cnt + ',' + req.body.iche_cnt + ',' + req.body.lst_iche_month + ")",
      function (
        error,
        results,
        fields
      ) {
        if (error) {
          console.log(error);
        }
        console.log(results);
        res.json(200, results);
      });
  });

  router.route("/grp_event_inf/select").post((req, res) => {
    console.log(req.body);
    connection.query("SELECT * FROM grp_event_inf where cusno = " + req.body.cusno, function (
      error,
      results,
      fields
    ) {
      if (error) {
        console.log(error);
      }
      console.log(results);
      res.json(200, results);
    });
  });

  router.route("/grp_event_inf/insert").post((req, res) => {
    console.log(req.body);
    connection.query("INSERT INTO grp_event_inf values (" + req.body.grpco_cid + ',' + req.body.cusno + ',' + req.body.event_dt + ',' + req.body.event_no + ',' +
      req.body.event_nm + ',' + req.body.event_memo + ',' + req.body.sjdt + ',' + req.body.dudt + ',' + req.body.status + ',' + req.body.success_yn + ")",
      function (
        error,
        results,
        fields
      ) {
        if (error) {
          console.log(error);
        }
        console.log(results);
        res.json(200, results);
      });
  });

  router.route("/grp_mypoint_inf/select").post((req, res) => {
    console.log(req.body);
    connection.query("SELECT * FROM grp_mypoint_inf where cusno = " + req.body.cusno, function (
      error,
      results,
      fields
    ) {
      if (error) {
        console.log(error);
      }
      console.log(results);
      res.json(200, results);
    });
  });

  router.route("/grp_mypoint_inf/insert").post((req, res) => {
    /*req = {
      body:{
        grpco_cid:'10',
        mypoint:'10',
        lst_trxdt:'10'
      }
    }*/

    console.log(req);
    connection.query("INSERT INTO grp_mypoint_inf values (" + req.body.grpco_cid + ',' + req.body.mypoint + ',' + req.body.lst_trxdt + ")",
      function (
        error,
        results,
        fields
      ) {
        if (error) {
          console.log(error);
        }
        console.log(results);
        res.json(200, results);
      });
  });

  router.route("/api_call/card/grp_mypoint_inf").get((req, res) => {
    console.log(req.body);

    var data = JSON.stringify({
      "dataHeader": {
      },
      "dataBody": {
        "nxtQyKey": "",
        "nqryD": "20191101",
        "pntTpCd": "L01"
      }
    })

    var options = {
      hostname: '10.3.17.61',
      port: '8081',
      path: '/v1/usecard/searchpointdetail',
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset = UTF-8",
      },
      data,
      memo: "568600622"
    }

    var quest = http.request(options, (resp) => {
      console.log(resp.statusCode)
      resp.on('data', (d) => {

        setTimeout(() => {
          process.stdout.write(d);
          var result
          result = JSON.parse(d.toString());

          myquery = "UPDATE grp_mypoint_inf SET mypoint = " + result.dataBody.restP
          midquery = " where cusno in( " + options.memo + ")"
          connection.query(myquery + midquery,
            function (
              error,
              results,
              fields
            ) {
              if (error) {
                console.log(error);
              }
              console.log(results);
            });

          connection.query("SELECT * FROM grp_mypoint_inf where cusno = " + options.memo,
            function (
              error,
              results,
              fields
            ) {
              if (error) {
                console.log(error);
              }
              console.log(results);
              res.json(200, results);
            });
        }, 0)
      })
    })

    quest.on('error', (error) => {
      console.error(error)
    })

    quest.write(data)
    quest.end()
  });

  router.route("/api_call/bank/naverpay_inf").get((req, res) => {
    console.log(req.body);

    var data = JSON.stringify({
      "dataHeader":
      {
      },
      "dataBody":
      {
        "serviceCode": "D2004",
        "출금은행구분": "1",
        "출금계좌번호": "110-184-647880",
        "비밀번호체크유무": "1"
      }
    })

    var options = {
      hostname: '10.3.17.61',
      port: '8080',
      path: '/v2/stocks/balance-check',
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset = UTF-8",
      },
      data,
      memo: "568600622"
    }

    var quest = http.request(options, (resp) => {
      console.log(resp.statusCode)
      resp.on('data', (d) => {

        setTimeout(() => {
          process.stdout.write(d);
          var result
          result = JSON.parse(d.toString());



          myquery = "UPDATE grp_naverpay_inf SET jan = " + result.dataBody.지불가능잔액
          midquery = " where cusno in( " + options.memo + ")"
          connection.query(myquery + midquery,
            function (
              error,
              results,
              fields
            ) {
              if (error) {
                console.log(error);
              }
              console.log(results);
            });

          connection.query("SELECT * FROM grp_naverpay_inf where cusno = " + options.memo,
            function (
              error,
              results,
              fields
            ) {
              if (error) {
                console.log(error);
              }
              console.log(results);
              res.json(200, results);
            });
        }, 0)
      })
    })

    quest.on('error', (error) => {
      console.error(error)
    })

    quest.write(data)
    quest.end()
  });

  router.route("/api_call/card/grp_smart_card_inf").get((req, res) => {
    console.log(req.body);

    var data = JSON.stringify({
      "dataHeader": {
      },
      "dataBody": {
        "nxtQyKey": "",
        "inqterm": "2019050720190805",
        "bctag": "0"
      }
    })

    var options = {
      hostname: '10.3.17.61',
      port: '8081',
      path: '/v1/usecreditcard/searchusefordomestic',
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset = UTF-8",
      },
      data,
      memo: "568600622"
    }

    var quest = http.request(options, (resp) => {
      console.log(resp.statusCode)
      resp.on('data', (d) => {

        setTimeout(() => {
          process.stdout.write(d);
          var result
          result = JSON.parse(d.toString());
          connection.query("UPDATE grp_smart_card_inf SET card_amt = " + result.dataBody.grp001[0].aprvamt + " where cusno in( " + options.memo + ")",
            function (
              error,
              results,
              fields
            ) {
              if (error) {
                console.log(error);
              }
              console.log(results);
            });

          connection.query("SELECT * FROM grp_smart_card_inf where cusno = " + options.memo,
            function (
              error,
              results,
              fields
            ) {
              if (error) {
                console.log(error);
              }
              console.log(results);
              res.json(200, results);
            });
        }, 0)
      })
    })

    quest.on('error', (error) => {
      console.error(error)
    })

    quest.write(data)
    quest.end()
  });

  router.route("/api_call/insurance/grp_rich_insuranse_inf").get((req, res) => {
    console.log(req.body);

    var data1 = JSON.stringify({
      "dataHeader": {
      },
      "dataBody": {
        "pageNo": "1", "rowCn": "10", "canIclYn": "1",
        "inpFeKdCd": "01", "inonNo": "WmokLBDCO9/yfihlYoJFyg==",
        "pamClosStrtYm": "190001", "pamClosEndYm": "20161231"
      }
    })

    var options1 = {
      hostname: '10.3.17.61',
      port: '8083',
      path: '/v1/contract/premium-history',
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset = UTF-8",
      },
      data1,
      memo: "568600622"
    }

    var quest1 = http.request(options1, (resp) => {
      console.log(resp.statusCode)
      resp.on('data', (d) => {

        setTimeout(() => {
          process.stdout.write(d);
          var result
          result = JSON.parse(d.toString());
          connection.query("UPDATE grp_rich_insuranse_inf SET iche_cnt = " +
            result.dataBody.PamMattList.retrieveInpFePamMattListPamMattMultiDTO[0].pamDgrCn + " where cusno in( " + options1.memo + ")",
            function (
              error,
              results,
              fields
            ) {
              if (error) {
                console.log(error);
              }
              console.log(results);
            });
          connection.query("SELECT * FROM grp_rich_insuranse_inf where cusno = " + options.memo,
            function (
              error,
              results,
              fields
            ) {
              if (error) {
                console.log(error);
              }
              console.log(results);
              res.json(200, results);
            });
        }, 0)
      })
    })

    var data1 = JSON.stringify({
      "dataHeader": {

      },
      "dataBody": {
        "inqrScCd": "9", "inonNo": "WmokLBDCO9/yfihlYoJFyg=="
      }
    })

    var options1 = {
      hostname: '10.3.17.61',
      port: '8083',
      path: '/v1/contract/reserved-amount',
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset = UTF-8",
      },
      data1,
      memo: "568600622"
    }

    var quest2 = http.request(options2, (resp) => {
      console.log(resp.statusCode)
      resp.on('data', (d) => {

        setTimeout(() => {
          process.stdout.write(d);
          var result
          result = JSON.parse(d.toString());
          connection.query("UPDATE grp_rich_insuranse_inf SET jan = " +
            result.dataBody.PamMattList.CtclRstAmDtptPati.nypyInpFe + " where cusno in( " + options2.memo + ")",
            function (
              error,
              results,
              fields
            ) {
              if (error) {
                console.log(error);
              }
              console.log(results);
            });
        }, 0)
      })
    })

    quest1.on('error', (error) => {
      console.error(error)
    })

    quest2.on('error', (error) => {
      console.error(error)
    })


    quest1.write(data1)
    quest1.end()

    quest2.write(data2)
    quest2.end()
  });

  router.route("/");
  app.use(router);

  http.createServer(app).listen(app.get("port"), () => {
    console.log(`Api  Server Start on ` + port);
  });