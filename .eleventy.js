module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/**/*.css");
  eleventyConfig.addPassthroughCopy("src/**/*.js");
  eleventyConfig.setDataDeepMerge(true);
};