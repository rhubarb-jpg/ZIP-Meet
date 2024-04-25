import { useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";

const CloudinaryUpload = ({ pics, setPics }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    var list = [];
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dd5ybai4s",
        uploadPreset: "ZipMeet",
      },
      function (error, result) {
        console.log(result);
        if (result.event === "queues-end") {
          result.info.files.forEach((file) => {
            list.push(file.uploadInfo.url);
          });
          setPics(list);
          list = [];
        }
      }
    );
  }, []);

  return (
    <Button className="picture-button" onClick={() => widgetRef.current.open()}>
      Upload Pictures
    </Button>
  );
};

export default CloudinaryUpload;
