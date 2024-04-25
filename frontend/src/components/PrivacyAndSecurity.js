import Form from "react-bootstrap/Form";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useUserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
function DeleteAccount() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [toastshow, setToastShow] = useState(false);
  const { user } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const handleToastShow = () => {
    setToastShow(!toastshow);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
   
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          withCredentials: true,
        },
      };
      const response = await axios.delete(
        `/api/user/${user._id}`,
        config
      );
      setIsLoading(false);
      handleToastShow();
  
      setSuccess("Successfully deleted account!");
      navigate('/login');
    } catch (err) {
      setError(err?.response.data.error);
      console.log(err?.response.data.error);
      setIsLoading(false);
    }
    handleToastShow();
  };

  return (
    <Form className="del-account-form" onSubmit={handleSubmit}>
      <Container className="deletebutton">
        <h2>By clicking the below button, you acknowledge that your account and all of its data will be deleted! This action <b>CANNOT</b> be undone!</h2>
        <br></br>
        <Button
          variant="danger"
          type="submit"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          Delete Account
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
export default DeleteAccount;