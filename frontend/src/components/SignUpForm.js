import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import { useSignup } from "../hooks/useSignUp";
import CloudinaryUpload from "./CloudinaryUpload";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Select from "react-select";
import makeAnimated from "react-select/animated";

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup, isLoading, error, pics, setPics } = useSignup();
  const [show, setShow] = useState(false);
  const [zipcode, setZipcode] = useState("");
  const [dob, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [interest, setInterest] = useState("");
  const [toastshow, setToastShow] = useState(false);
  const [userInterests, setUserInterests] = useState([]);
  const animatedComponents = makeAnimated();
  const options = [
    { value: "Movies", label: "Movies" },
    { value: "Pets", label: "Pets" },
    { value: "Games", label: "Games" },
    { value: "Travelling", label: "Travelling" },
    { value: "Cooking", label: "Cooking" },
    { value: "Food", label: "Food" },
    { value: "Arts & Crafts", label: "Arts & Crafts" },
    { value: "Literature", label: "Literature" },
    { value: "Sports", label: "Sports" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(
      name,
      email,
      password,
      confirmPassword,
      pics,
      zipcode,
      dob,
      gender,
      interest,
      userInterests
    );
    handleToastShow();
  };

  const handleShowClick = () => {
    setShow(!show);
  };
  const handleToastShow = () => {
    setToastShow(!toastshow);
  };

  return (
    <Form className="create-account-form" onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <InputGroup>
          <Form.Control
            type={show ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleShowClick}>{show ? "Hide" : "Show"}</Button>
        </InputGroup>
      </Form.Group>
      <Form.Group>
        <Form.Label>Confirm Password</Form.Label>
        <InputGroup>
          <Form.Control
            type={show ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button onClick={handleShowClick}>{show ? "Hide" : "Show"}</Button>
        </InputGroup>
      </Form.Group>

      <Form.Group>
        <Form.Label>Zicode</Form.Label>
        <Form.Control
          placeholder="Zipcode"
          onChange={(e) => setZipcode(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control
          type="date"
          placeholder="Date of Birth"
          onChange={(e) => {
            setDOB(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Gender</Form.Label>
        <Form.Control
          as="select"
          onChange={(e) => {
            setGender(e.target.value);
          }}
        >
          <option>Choose an option</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Interest?</Form.Label>
        <Form.Control
          as="select"
          onChange={(e) => {
            setInterest(e.target.value);
          }}
        >
          <option>Choose an option</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </Form.Control>
      </Form.Group>
      <Form.Group className="select-div">
        <Form.Label>Select 3 Hobbies</Form.Label>
        <Select
          className="select-interests"
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={options}
          onChange={(e) => setUserInterests(e)}
        />
      </Form.Group>
      <Form.Group>
        <CloudinaryUpload pics={pics} setPics={setPics} />
      </Form.Group>
      <Container className="button-container">
        <Button variant="primary" type="submit" disabled={isLoading}>
          Sign Up
        </Button>
      </Container>
      {error && (
        <ToastContainer position="bottom-center">
          <Toast
            onClose={() => setToastShow(false)}
            show={toastshow}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">Error</strong>
            </Toast.Header>
            <Toast.Body>{error}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </Form>
  );
}
export default SignUpForm;
