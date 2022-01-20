import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import services from "../services";
import SelectSearch from "react-select-search";

import cities from "../data/cities.json";

import { Typeahead } from "react-bootstrap-typeahead";

const AddScreen = () => {
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [selectedCity, setSelectedCity] = useState([]);

  const handleSumbit = async () => {
    try {
      if (description.length > 254) {
        alert("Description is to long");
        return;
      }

      if (selectedCity.length < 1) {
        alert("You must select city");
        return;
      }

      const name = selectedCity[0].name;
      const code = selectedCity[0].code;

      const city = {
        name,
        code,
        description,
      };
      const resp = await services.addCity(city);
      console.log(resp);
      alert("City added successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Add city failed! You have this city in your list already");
    }
  };

  return (
    <Container style={{ padding: 16 }}>
      <Row>
        <Col>
          <Form>
            <Form.Group>
              <Form.Label>City description (optional)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city description ..."
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Cities</Form.Label>
              <Typeahead
                id="basic-typeahead-single"
                labelKey="name"
                onChange={setSelectedCity}
                options={cities}
                placeholder="Choose a city..."
                selected={selectedCity}
              />
            </Form.Group>

            <Form.Group>
              <Button
                className="tarpas"
                size="lg"
                variant="primary"
                onClick={handleSumbit}
              >
                Add
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddScreen;
