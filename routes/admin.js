var express = require("express");
var router = express.Router();
var News = require("../models/news");

router.all("*", function (req, res, next) {
  if (!req.session.admin) {
    res.redirect("login");
    return;
  }
  next();
});

/* GET home page. */
router.get("/", function (req, res, next) {
  News.find({}, (err, data) => {
    res.render("admin/index", { title: "Admin", data });
  });
});

router.get("/news/add", (req, res) => {
  res.render("admin/news-form", { title: "Dodaj news", errors: {}, body: {} });
});

router.post("/news/add", (req, res) => {
  const body = req.body;

  const newsData = new News(body);

  const errors = newsData.validateSync();

  newsData.save((err) => {
    if (err) {
      res.render("admin/news-form", { title: "Dodaj news", errors, body });
      return;
    } else {
      res.redirect("/admin");
    }
  });
});

router.get("/news/delete/:id", (req, res) => {
  News.findByIdAndDelete(req.params.id, (err) => {
    res.redirect("/admin");
  });
});

module.exports = router;
