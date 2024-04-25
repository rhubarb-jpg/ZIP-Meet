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
import CloudinaryUpload from "./CloudinaryUpload";
function ProfileComp() {
  const navigate = useNavigate();
  const [oldPics, setOldPics] = useState("");
  const [pics, setNewPics] = useState("");
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
      const response = await axios.patch(
        `/api/user/${user._id}`,
        JSON.stringify({
          pics: oldPics , newPics: pics
        }),
        config
      );
      setIsLoading(false);
      handleToastShow();
  
      setSuccess("Successfully changed pictures!");
      navigate('/settings');
    } catch (err) {
      setError(err?.response.data.error);
      console.log(err?.response.data.error);
      setIsLoading(false);
    }
    handleToastShow();
  };

  return (
    <Form className="change-pics-form" onSubmit={handleSubmit}>
      <Container className="changepicsbutton">
        <h2>Change your uploaded pics by clicking the below button</h2>
        <br></br>
        <CloudinaryUpload pics={pics} setPics={setNewPics} />
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





export default ProfileComp;