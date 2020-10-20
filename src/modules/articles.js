import axios from "axios";

const Articles = {
  async create(title, teaser, content, category, premium) {
    let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));

    try {
      let result = await axios.post(
        "/admin/articles",
        {
          article: {
            title: title,
            teaser: teaser,
            content: content,
            category: category,
            premium: premium,
          },
        },

        {
          headers: {
            ...headers,
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      );
      return result;
    } catch (error) {
      return error.response.data.message;
    }
  },
};
export default Articles;
