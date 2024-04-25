import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const [show, setShow] = useState(false);
  const [toastshow, setToastShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
    handleToastShow();
  };
  const handleShowClick = () => {
    setShow(!show);
  };
  const handleToastShow = () => {
    setToastShow(!toastshow);
  };
  return (
    <Container>
      <Form className="login-form" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={show ? "text" : "password"}
              placeholder=""
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleShowClick}>{show ? "Hide" : "Show"}</Button>
          </InputGroup>
        </Form.Group>
        <Container className="button-container">
          <Button variant="primary" type="submit" disabled={isLoading}>
            Sign In
          </Button>
        </Container>
      </Form>
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
    </Container>
  );
}
export default LoginForm;
