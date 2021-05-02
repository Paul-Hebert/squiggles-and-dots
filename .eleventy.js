module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/**/*.css");
  eleventyConfig.addPassthroughCopy("src/**/*.js");
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addCollection('art', function(collection) {
    return collection.getFilteredByGlob('src/art/**/!(example).md');
  });
};