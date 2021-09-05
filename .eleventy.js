module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/**/*.css");
  eleventyConfig.addPassthroughCopy("src/**/*.js");
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addFilter("sortByOrder", function (array) {
    // return array;
    return array.sort((a, b) => {
      console.log(a.data.order, b.data.order);
      if (a.data.order === b.data.order) return 0;

      if(!a.data.order) return 1;
      if (!b.data.order) return -1;
      
      return a.data.order < b.data.order ? -1 : 1;
    });
  });

  eleventyConfig.addCollection('art', function(collection) {
    return collection.getFilteredByGlob('src/art/**/*.md');
  });
};