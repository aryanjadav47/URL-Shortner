const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
let path=require("path");

const app = express();
const PORT = 8001;

app.set("view engine","ejs");
app.set("views",path.resolve('./views'));

connectToMongoDB("mongodb://localhost:27017/shorterror").then(() =>
  console.log("Mongodb connected")
);

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use("/url", urlRoute);
app.get("/analytics/:shortId",urlRoute);
app.get("/test",urlRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId :shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
