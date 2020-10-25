import axios from "axios";

const Articles = {
  async create(title, teaser, content, category, premium, image, location) {
    let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
    try {
      let result = await axios.post(
        "/admin/articles",
        {
          article: {
            title: title.value,
            teaser: teaser.value,
            content: content.value,
            category: category,
            premium: premium.checked,
            image: image,
            location: location,
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
