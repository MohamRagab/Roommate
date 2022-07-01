var stringSimilarity = require("string-similarity");

var similarity = stringSimilarity.compareTwoStrings("a", "ab");
var matches = stringSimilarity.findBestMatch("acfhlu", [
  "ac",
  "af",
  "ach",
  "theatre",
  "healed",
  "heal",
  "healedsaaa",
]);
// console.log(matches)
// console.log(similarity)
// console.log(matches.ratings.filter(element => element.rating >= 0.8))
const fruits = ["Z", "B", "G", "R", "A", "S", "E", "T", "W", "Q"];
const fruits2 = ["S", "G", "E", "Z"];
let x = 0;
for (var i = 0; i < fruits.length; i++) {
  if (fruits2.includes(fruits[i])) {
    x++
  }
}

const similar = fruits.includes(...fruits2);

console.log(x / (fruits.length / fruits2.length));
var columns = ["Date", "Number", "Size", "Location", "Age"];
var rows = ["2001", "5", "Big", "Sydney", "25"];
var result = rows.reduce(function (result, field, index) {
  result[columns[index]] = field;
  return result;
}, {})

console.log(result);