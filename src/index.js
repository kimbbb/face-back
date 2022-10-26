import express from "express";
import authRouter from "./router/authRouter";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 8081;

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}

app.use(allowCrossDomain)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/auth", authRouter);

// 8080 포트번호로 서버를 킨다
app.listen(PORT, () => {
  console.log(`✅ http://localhost:${PORT}`);
});
