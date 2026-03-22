const axios = require("axios");
const cheerio = require("cheerio");
const Course = require("../models/courseSchema");

const scrapeCourses = async () => {
  try {
    const url = "https://books.toscrape.com/";
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    const html = response.data;
    const $ = cheerio.load(html);

    const courses = [];

    $("article").each((index, element) => {
      const name = $(element).find("h3").text().trim();
      const link = $(element).find("a").attr("href");

      if (!name || !link) return;

      courses.push({
        name: name,
        description: "Course scraped from Class Central",
        originalPrice: 1000,
        discountPrice: 0,
        discountPercent: 100,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/3/3b/Online_learning_icon.png",
        link: `https://www.classcentral.com${link}`,
        category: "programming",
        source: "Class Central",
      });
    });

    for (let course of courses) {
      const exists = await Course.findOne({ name: course.name });
      if (!exists) {
        await Course.create(course);
      }
    }

    return {
      message: "Course scraping completed successfully",
      count: courses.length,
    };
  } catch (error) {
    console.log("Scraper error:", error.message);
    throw error;
  }
};

module.exports = { scrapeCourses };
