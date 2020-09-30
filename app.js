//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require("cors");
const port = 3000;

const app = express();
mongoose.connect(
  "mongodb+srv://admin-henry:Ak2jaFk7LU7maHs@cluster0.hk3iv.mongodb.net/todolistDB?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);

const keeperSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
});

const Keeper = mongoose.model("Keeper", keeperSchema);

const keeper1 = new Keeper({
  title: "Delegation",
  content:
    "Q. How many programmers does it take to change a light bulb? A. None – It’s a hardware problem",
});
const keeper2 = new Keeper({
  title: "Loops",
  content:
    "How to keep a programmer in the shower forever. Show him the shampoo bottle instructions: Lather. Rinse. Repeat.",
});
const keeper3 = new Keeper({
  title: "Arrays",
  content:
    "Q. Why did the programmer quit his job? A. Because he didn't get arrays.",
});
const keeper4 = new Keeper({
  title: "Hardware vs. Software",
  content:
    "What's the difference between hardware and software? You can hit your hardware with a hammer, but you can only curse at your software.",
});

// Keeper.insertMany([keeper1, keeper2, keeper3, keeper4], (err) => {
//   if (err) {
//     console.log(`error:${err}`);
//   } else {
//     console.log("Insert successfully");
//   }
// });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.listen(process.env.PORT || port, () => {
  console.log(`Server app started on port:${process.env.PORT || port}`);
});

app.get("/", (req, res) => {
  res.render("drum");
});

app.get("/keepers/:key", (req, res) => {
  if (req.params.key === "234568") {
    Keeper.find((err, keepers) => {
      res.send(keepers);
    });
  } else {
    res.send("Wrong key");
  }
});

app.post("/keepers/:key", (req, res) => {
  if (req.params.key === "234568") {
    console.log(req.body);
    createKeeper({
      title: req.body.title,
      content: req.body.content,
    });
    res.send("New keeper created");
  } else {
    res.send("Wrong key");
  }
});
app.delete("/keepers/:key", (req, res) => {
  if (req.params.key === "234568") {
    const idToDelete = req.body.id;
    Keeper.findByIdAndDelete(idToDelete, (err) => {
      if (err) {
        res.send(`Can't delete:${err}`);
      } else {
        res.send("New keeper deleted");
      }
    });
  } else {
    res.send("Wrong key");
  }
});

function createKeeper(keeper) {
  let newKeeper = new Keeper(keeper);
  newKeeper.save();
}
