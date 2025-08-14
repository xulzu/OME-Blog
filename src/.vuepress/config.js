const selfTheme = require("./theme/");
module.exports = {
  lang: "zh-cn",
  title: "OME`s Blog",
  theme: selfTheme,
  locales: {
    "/": {
      lang: "zh-cn",
    },
  },
  header: "OME`s Blog",
  dest: "docs",
  base: "/OME-Blog/",
  evergreen: true,
  themeConfig: {
    nav: [
      {
        text: "Article",
        link: "/",
        desc: "文章",
      },
      {
        text: "Category",
        link: "/category",
        desc: "分类",
      },
      // {
      //   text: 'Search',
      //   link: '/search',
      //   desc:'搜索'

      // },
      {
        text: "About",
        link: "/about",
        desc: "关于",
      },
    ],
    category: [
      {
        title: "Algorithm",
        key: ["Algorithm"],
        desc: "算法",
      },
      {
        title: "JavaScript",
        key: ["JavaScript"],
        desc: "JavaScript",
      },
      {
        title: "Vue",
        key: ["Vue", "vue-router", "vuex"],
        desc: "Vue家族",
      },
      {
        title: "Other",
        key: ["Other"],
        desc: "其他",
      },
      {
        title: "CSS",
        key: ["CSS"],
        desc: "css样式",
      },
      {
        title: "Webpack",
        key: ["Webpack"],
        desc: "Webpack",
      },
    ],
    footer: "lisence -_- @2020-01-23 OME",
  },
};
