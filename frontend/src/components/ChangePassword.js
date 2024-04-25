import Form from "react-bootstrap/Form";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useUserContext } from "../context/UserContext";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [toastshow, setToastShow] = useState(false);
  const { user } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleShowClick = () => {
    setShow(!show);
  };
  const handleToastShow = () => {
    setToastShow(!toastshow);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (password == "" || confirmPassword == "" || oldPassword == "") {
      setError("Please fill all fields");
      handleToastShow();
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      handleToastShow();
      setIsLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          withCredentials: true,
        },
      };
      const response = await axios.patch(
        `/api/user/${user._id}`,
        JSON.stringify({ password: oldPassword, newPassword: password }),
        config
      );
      setIsLoading(false);
      handleToastShow();
      setConfirmPassword("");
      setOldPassword("");
      setPassword("");
      setSuccess("Successfully changed password");
    } catch (err) {
      setError(err?.response.data.error);
      console.log(err?.response.data.error);
      setIsLoading(false);
    }
    handleToastShow();
  };

  return (
    <Form className="change-password-form" onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Old Password</Form.Label>
        <InputGroup>
          <Form.Control
            type={show ? "text" : "password"}
            placeholder="Enter Old Password to be changed"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <Button onClick={handleShowClick}>{show ? "Hide" : "Show"}</Button>
        </InputGroup>
      </Form.Group>
      <Form.Group>
        <Form.Label>New Password</Form.Label>
        <InputGroup>
          <Form.Control
            type={show ? "text" : "password"}
            placeholder="Enter New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleShowClick}>{show ? "Hide" : "Show"}</Button>
        </InputGroup>
      </Form.Group>

      <Form.Group>
        <Form.Label>Confirm New Password</Form.Label>
        <InputGroup>
          <Form.Control
            type={show ? "text" : "password"}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button onClick={handleShowClick}>{show ? "Hide" : "Show"}</Button>
        </InputGroup>
      </Form.Group>
      <Container className="button-container">
        <Button
          variant="primary"
          type="submit"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          Change Password
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
      {success && (
        <ToastContainer position="bottom-center">
          <Toast
            onClose={() => setToastShow(false)}
            show={toastshow}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">Success</strong>
            </Toast.Header>
            <Toast.Body>{success}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </Form>
  );
}
export default ChangePassword;