import React, { useState } from "react";
import { Form, Container, Checkbox, Segment, Message } from "semantic-ui-react";
import Article from "../modules/articles";
import { useHistory } from "react-router-dom";
import toBase64 from "../modules/toBase64";

const ArticleForm = () => {
  const [message, setMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [image, setImage] = useState();
  const history = useHistory();

  const selectImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let encodedImage;
    let title = e.target.title.value;
    let teaser = e.target.teaser.value;
    let content = e.target.content.value;
    let premium = e.target.premium.checked;

    if (image) {
      encodedImage = await toBase64(image);
    }
    const result = await Article.create(
      title,
      teaser,
      content,
      selectedCategory,
      premium,
      encodedImage
    );

    if (result.status === 200) {
      history.push("/", { message: result.data.message });
    } else {
      setMessage(result);
    }
  };

  return (
    <Container>
      <Segment>
        <Form
          widths="equal"
          data-cy="form-article"
          id="create-article"
          onSubmit={onSubmit}
        >
          <Form.Group widths="equal" data-cy="form-article">
            <Form.Input
              fluid
              label="Title"
              placeholder="Title"
              id="title"
              data-cy="title"
            />
            <Form.Input
              fluid
              label="Teaser"
              placeholder="Teaser"
              data-cy="teaser"
              id="teaser"
            />
            <Form.Select
              fluid
              label="Category"
              options={options}
              onChange={(e, data) => {
                handleCategoryChange(data.value);
              }}
              placeholder="Category"
              data-cy="category"
              id="category"
            />
            <Form.TextArea
              label="Article"
              placeholder="..."
              data-cy="content"
              id="content"
            />
            <Form.Field>
              <Checkbox
                toggle
                data-cy="premium"
                label="Premium Article?"
                id="premium"
              />
              <Form.Input
                onChange={selectImage}
                fluid
                label="Image"
                placeholder="Image"
                id="image"
                data-cy="image"
                type="file"
              />
            </Form.Field>
          </Form.Group>
          <Form.Button color="blue" data-cy="save-article">
            Save Article
          </Form.Button>
        </Form>
        {message && (
          <Message negative data-cy="save-article-message">
            <Message.Header>{message}</Message.Header>
          </Message>
        )}
      </Segment>
    </Container>
  );
};

const options = [
  { key: "m", text: "Sports", value: "sports" },
  { key: "f", text: "Entertainment", value: "entertainment" },
  { key: "o", text: "Weather", value: "weather" },
  { key: "o", text: "Business", value: "business" },
  { key: "o", text: "News", value: "news" },
];

export default ArticleForm;
