"use strict";

const http = require("./app.js");
const port = 3000;

http.listen(port, () => {
  console.log(port, `port 에서 수신 중`);
});