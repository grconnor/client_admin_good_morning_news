import React, { useState } from "react";
import { Form, Container, Checkbox, Segment, Message } from "semantic-ui-react";
import Article from "../modules/articles";
import { useHistory } from "react-router-dom";
import toBase64 from "../modules/toBase64";

const ArticleForm = () => {
  const [message, setMessage] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [image, setImage] = useState();
  const history = useHistory();

  const selectImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const handleLocationChange = (value) => {
    setSelectedLocation(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let { title, teaser, content, premium } = e.target;
    let encodedImage;

    if (image) {
      encodedImage = await toBase64(image);
    }
    const result = await Article.create(
      title,
      teaser,
      content,
      selectedCategory,
      premium,
      encodedImage,
      selectedLocation
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
              options={categoryOptions}
              onChange={(e, data) => {
                handleCategoryChange(data.value);
              }}
              placeholder="Category"
              data-cy="category"
              id="category"
            />
            <Form.Select
              fluid
              label="Location"
              options={localOptions}
              onChange={(e, data) => {
                handleLocationChange(data.value);
              }}
              placeholder="Location"
              data-cy="location"
              id="location"
            />
            <Form.TextArea
              label="Content"
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

const categoryOptions = [
  { key: "m", text: "Sports", value: "sports" },
  { key: "f", text: "Entertainment", value: "entertainment" },
  { key: "o", text: "Weather", value: "weather" },
  { key: "o", text: "Business", value: "business" },
  { key: "o", text: "News", value: "news" },
];

const localOptions = [
  { key: "m", text: "Sweden", value: "Sweden" },
  { key: "f", text: "International", value: "International" },
];

export default ArticleForm;
