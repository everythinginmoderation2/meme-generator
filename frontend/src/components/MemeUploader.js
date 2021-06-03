import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import memesListActions from "../redux/actions/memesList.actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const MemeUploader = () => {
  const [file, setFile] = useState(null);
  //   "size":32,
  //   "color":"WHITE",
  // "alignmentX":"HORIZONTAL_ALIGN_CENTER",
  // "alignmentY":"VERTICAL_ALIGN_TOP",
  //   "topText":"This is up top"
  const [topTextColor, setTopTextColor] = useState("WHITE");
  const [bottomTextColor, setBottomTextColor] = useState("WHITE");
  const [topTextSize, setTopTextSize] = useState('16');
  const [bottomTextSize, setBottomTextSize] = useState('16');
  const [topTextText, setTopTextText] = useState("");
  const [bottomTextText, setBottomTextText] = useState("");

  const topTextObject = {
    size: topTextSize,
    color: topTextColor,
    alignmentX: "HORIZONTAL_ALIGN_CENTER",
    alignmentY: "VERTICAL_ALIGN_TOP",
    topText: topTextText,
  };
  const bottomTextObject= {
    size: bottomTextSize,
    color: bottomTextColor,
    alignmentX: "HORIZONTAL_ALIGN_CENTER",
    alignmentY: "VERTICAL_ALIGN_BOTTOM",
    bottomText: bottomTextText,
  };

  const blackSizes = [8, 10, 12, 14, 16, 32, 64, 128];
  const whiteSizes = [8, 16, 32, 64, 128];
  const colors = ["WHITE", "BLACK"];
  const [isWhite, setIsWhite] = useState(true);

  const dispatch = useDispatch();

  //FILE
  const onFileChange = (e) => {
    console.log(e.target.files[0])
    setFile(e.target.files[0]);
  };

  //TEXT
  const onTopTextTextChange = (e) => {
    setTopTextText(e.target.value);
  };

  const onBottomTextTextChange = (e) => {
    setBottomTextText(e.target.value);
  };

  //COLOR
  const onTopTextColorChange = (e) => {
    e.preventDefault(e)
    if (e.target.value === "BLACK") {
      setIsWhite(!isWhite);
    } else {
      setIsWhite(true)
    }
    setTopTextColor(e.target.value);
  };
  const onBottomTextColorChange = (e) => {
    if (e.target.value === "BLACK") {
      setIsWhite(!isWhite);
    } else {
      setIsWhite(true)
    }
    setBottomTextColor(e.target.value);
  };

  //SIZE
  const onTopTextSizeChange = (e) => {
    setTopTextSize(e.target.value);
  };

  const onBottomTextSizeChange = (e) => {
    setBottomTextSize(e.target.value);
  };

 

  const uploadMeme = async (e) => {
    e.preventDefault();
    console.log('hello')
    if (!file) {
      toast.configure();
      toast.error("💩 Please upload a file", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log('no file')
    }
    const newMeme = await forMemeController(file, topTextObject, bottomTextObject)
    await dispatch(memesListActions.postSingleMeme(newMeme));
    await dispatch(memesListActions.getMemes)
  };

  const forMemeController = async (file, topTextObject, bottomTextObject) => {
    console.log(file)
    const formData = new FormData();
    const id = Date.now()
    await formData.append("id", id)
    await formData.append("image", file);
    await formData.append("topText", JSON.stringify(topTextObject));
    await formData.append("bottomText", JSON.stringify(bottomTextObject));
    return formData
  }

  useEffect(()=>{
    topTextObject.size = topTextSize
    topTextObject.color = topTextColor
    topTextObject.topText = topTextText
    bottomTextObject.size = bottomTextSize
    bottomTextObject.color = bottomTextColor
    bottomTextObject.bottomText = bottomTextText
    console.log(topTextObject, bottomTextObject)
  },[topTextColor, topTextSize, topTextText, bottomTextColor, bottomTextSize, bottomTextText, bottomTextObject, topTextObject])

  return (
    <div>
      <h2 style={{ marginTop: "2rem", marginBottom: "2rem" }}>Meme Uploader</h2>
      <Row>
        <Col>
          <Form onSubmit={uploadMeme}>
            <Form.Group>
              <Form.File
                id="fileUpload"
                onChange={onFileChange}
                label="Upload Your Image Here"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Top Text</Form.Label>
              <Form.Control
                id="topTextText"
                type="text"
                onChange={onTopTextTextChange}
                value={topTextText}
                placeholder="Type here"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Text Color</Form.Label>
              <Form.Control
                id="topTextColor"
                as="select"
                onChange={onTopTextColorChange}
                value={topTextColor}
              >
                {colors.map((color) => (
                  <option key={`${color}`}>{color}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Text Size</Form.Label>
              <Form.Control
                id="topTextSize"
                as="select"
                onChange={onTopTextSizeChange}
                value={topTextSize}
              >
                {isWhite
                  ? whiteSizes.map((size) => <option key={`${size}`}>{size}</option>)
                  : blackSizes.map((size) => <option key={`${size}`}>{size}</option>)}
              </Form.Control>
            </Form.Group>

            <br />
            <Form.Group>
              <Form.Label>Bottom Text</Form.Label>
              <Form.Control
                id="bottomTextText"
                type="text"
                onChange={onBottomTextTextChange}
                value={bottomTextText}
                placeholder="Type here"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Text Color</Form.Label>
              <Form.Control
                id="bottomTextColor"
                as="select"
                onChange={onBottomTextColorChange}
                value={bottomTextColor}
              >
                {colors.map((color) => (
                  <option key={`${color}`}>{color}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Text Size</Form.Label>
              <Form.Control
                id="bottomTextSize"
                as="select"
                onChange={onBottomTextSizeChange}
                value={bottomTextSize}
              >
                {isWhite
                  ? whiteSizes.map((size) => <option key={`${size}`}>{size}</option>)
                  : blackSizes.map((size) => <option key={`${size}`}>{size}</option>)}
              </Form.Control>
            </Form.Group>
            <Button type="submit">Upload Meme</Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default MemeUploader;
