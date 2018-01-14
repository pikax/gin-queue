// import {QInterval} from '../dist/index';


const http = require("http");
const QInterval = require("../dist/index").QInterval


// Manga fox search example, it only allows you to search once per 5 seconds


const interval = 5000;

//Manga fox request
const requestSearch = () => {
  return new Promise(((resolve, reject) => {
    http.get("http://mangafox.la/search.php?name=gin", res => {
      res.setEncoding("utf8");
      let body = "";
      res.on("data", data => {
        body += data;
      });
      res.on("end", () => {
        if (body.indexOf("Sorry, can‘t search again within 5 seconds.") > -1) {
          //failed
          return reject("failed")
        }
        resolve("success");

      });
    });
  }))
    .then(x => console.log(x))
    .catch(x => console.error(x))
};

const queue = new QInterval({interval});


Promise.all([
    queue.queue(requestSearch),
    queue.queue(requestSearch)
  ]
);


