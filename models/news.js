var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var newsSchema = new Schema({
  title: { type: String, required: [true, "Tytuł jest wymagany"] },
  description: { type: String, required: [true, "Opis jest wymagany"] },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("News", newsSchema);
