import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import { useSignup } from "../hooks/useSignUp";
import CloudinaryUpload from "./CloudinaryUpload";
function ChangePhoneNum() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup, isLoading, error } = useSignup();
  const [show, setShow] = useState(false);
  const [pic, setPic] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(name, email, password, confirmPassword, pic);
  };

  const handleShowClick = () => {
    setShow(!show);
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
        <CloudinaryUpload setPic={setPic} />
      </Form.Group>
      <Container className="button-container">
        <Button variant="primary" type="submit" disabled={isLoading}>
          Sign Up
        </Button>
      </Container>
      {error && <Container>{error}</Container>}
    </Form>
  );
}
export default ChangePhoneNum;
