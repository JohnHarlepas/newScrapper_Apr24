

var axios = require("axios");
var cheerio = require("cheerio");


var scrape = function() {

  return axios.get("http://www.politico.com").then(function(res) {
    var $ = cheerio.load(res.data);
    var articles = [];

    // Now, find and loop through each element that has the "css-180b3ld" class. The New York Times changed its code so  "css-8atqhb" is the correct one
    // (i.e, the section holding the articles)
    // $("article.css-180b3ld").each(function(i, element) 
    $("section.media-item").each(function(i, element) {

      var head = $(this)
        .find("h1")
        .text()
        .trim();

  
      var url = $(this)
        .find("a")
        .attr("href");


      var sum = $(this)
        .find("p")
        .text()
        .trim();

      if (head && sum && url) {
  
        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();


        var dataToAdd = {
          headline: headNeat,
          summary: sumNeat,

          url: url
        };

        articles.push(dataToAdd);
      }
    });
    return articles;
  });
};

module.exports = scrape;
