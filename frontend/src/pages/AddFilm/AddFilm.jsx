import React, { useState } from "react";
import { Container, Button, Col, Form, Row, FloatingLabel } from "react-bootstrap";
import { AttachFile, Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../../config/api";
import { useEffect } from "react";

function AddFilm() {
  let navigate = useNavigate();

  const [categories, setCategories] = useState([]); //Store all category data
  // const [categoryId, setCategoryId] = useState([]); //Save the selected category id
  const [form, setForm] = useState({
    title: "",
    thumbnail: "",
    year: "",
    categoryId: "",
    description: "",
  }); //Store product data

  // Fetching category data
  const getCategories = async () => {
    try {
      const response = await API.get("/categories");
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // For handle if category selected
  // const handleChangeCategoryId = (e) => {
  //   const id = e.target.value;
  //   const selected = e.target.selected;

  //   if (selected) {
  //     // save cateogry id if seleccted
  //     setCategoryId([...categoryId, parseInt(id)]);
  //   } else {
  //        // Delete category id from variable if unchecked
  //        let newCategoryId = categoryId.filter((categoryIdItem) => {
  //         return categoryIdItem != id;;
  //        })
  //        setCategoryId(newCategoryId)
  //   }
  // }

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      //Configuration
      const config = {
        Headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      // Store Dataa  with  FormData as Object
      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("thumbnail", form.thumbnail[0], form.thumbnail[0].name);
      formData.set("year", form.year);
      formData.set("category_id", form.categoryId);
      formData.set("description", form.description);

      console.log(form);

      // Insert Film data
      const response = await API.post("/film", formData, config);
      console.log(response);

      navigate("/list-film");
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div style={{ paddingTop: "1rem", backgroundColor: "#0b0b0b", height: "100vh" }}>
      <Container>
        <h3 style={{ color: "white", marginTop: "30px" }}>Add Film</h3>
        <Form style={{ marginTop: "30px" }} onSubmit={(e) => handleSubmit.mutate(e)}>
          <Row>
            <Col xs={10}>
              <Form.Control placeholder="Title" id="title" name="title" style={{ backgroundColor: "gray", color: "white" }} onChange={handleChange} />
            </Col>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label style={{ backgroundColor: "gray", padding: "5px", borderRadius: "5px", color: "white" }} htmlFor="thumbnail1">
                  Attach Thumbnail
                  <AttachFile />
                </Form.Label>
                <Form.Control style={{ display: "none" }} id="thumbnail1" type="file" name="thumbnail" onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>
          <Form.Control placeholder="Year" name="year" style={{ backgroundColor: "gray", color: "white" }} onChange={handleChange} />
          <Form.Select aria-label="Default select example" style={{ marginTop: "18px", backgroundColor: "gray", color: "white" }} onChange={handleChange}>
            <option>Category</option>
            {categories.map((item) => (
              <>
                <option value={item.id}>{item.name}</option>
              </>
            ))}
          </Form.Select>
          <FloatingLabel controlId="floatingTextarea2" label="Description" style={{ marginTop: "18px" }}>
            <Form.Control as="textarea" name="description" placeholder="Description" style={{ height: "100px", backgroundColor: "gray", color: "white" }} onChange={handleChange} />
          </FloatingLabel>
          {/* <Row style={{marginTop: '50px'}}>
                <Col xs={10}>
                  <Form.Control placeholder="Title Episode" style={{backgroundColor: 'gray', color: 'white'}}/>
                </Col>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label style={{backgroundColor: 'gray', padding: '5px', borderRadius: '5px', color: 'white'}} htmlFor='thumbnail'>Attach Thumbnail<AttachFile/></Form.Label>
                    <Form.Control style={{display: 'none'}}  id='thumbnail' type="file" />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Control placeholder="Link Film" style={{backgroundColor: 'gray', color: 'white'}} />
              <Form.Group controlId="formFile" className="mb-3" style={{marginTop: '18px'}}>
                <Form.Label style={{backgroundColor: 'gray', padding: '5px', borderRadius: '5px', color: 'white', width: '1115px'}} htmlFor='label'><Add style={{marginLeft: '500px'}}/></Form.Label>
                <Form.Control style={{display: 'none'}}  id='label' type="file" />
              </Form.Group> */}
          <div style={{ float: "right" }}>
            <Button variant="danger" type="submit">
              Save
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}
export default AddFilm;
