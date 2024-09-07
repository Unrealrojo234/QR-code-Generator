import { useState, useRef } from "react";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import { useScreenshot } from "use-react-screenshot";

export default function App() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState("");
  const [show, setShow] = useState("none");
  const [fg, setFg] = useState("#000000");
  const [bg, setBg] = useState("#FFFFFF");
  const [linkdisplay, setLinkDisplay] = useState("none");

  //Clearing form
  const clear = () =>{
    setUrl(url=>"");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setData((data) => url);
    setShow((show) => "block");
    clear();
  };

  const handleUrl = (e) => {
    setUrl((url) => e.target.value);
  };

  //Taking the ScreenShot NB://The image is in base64 string
  const ref = useRef(null);
  const [image, takeScreenshot] = useScreenshot();
  const getImage = () => {
    takeScreenshot(ref.current);
    setLinkDisplay((linkdisplay) => "block");
  };

  //Stling QR-Code
  const handleFgColor = (e) => {
    setFg((fg) => e.target.value);
    console.log(fg);
  };

  const handleBgColor = (e) => {
    setBg((bg) => e.target.value);
    console.log(bg);
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center">QR-code Generator</h1>
      <div className="row">
        <div className="text-center">
          <h3 style={{ display: "inline-block" }}>
            Input URL/Text/Number here
          </h3>
          <h1
            style={{ display: "inline-block" }}
            className="animate__animated animate__heartBeat animate__slow animate__infinite"
          >
            👇🏾
          </h1>
        </div>
        <form
          className="form-control"
          style={{
            maxWidth: "35rem",
            padding: "15px",
            display: "block",
            margin: "auto",
          }}
          onSubmit={handleSubmit}
        >
          <input
            required
            value={url}
            onChange={handleUrl}
            className="form-control"
          />
          <br />
          <div className="d-grid">
            <button className="btn btn-success">Generate</button>
          </div>
        </form>
        <br />
      </div>

      <div>
        <br />
        <div ref={ref} className="text-center image-fluid" style={{ display: show ,maxWidth:'45rem',margin:'auto'}}>
          <QRCode value={data} fgColor={fg} bgColor={bg} size={'100%'} className="image-fluid" />
        </div>
        <br />
        <div className="text-center">
          <h3 className="text-center">Style QR-Code</h3>
          <h5 style={{ display: "inline-block" }}>Fore-ground color: </h5>{" "}
          <input value={fg} onChange={handleFgColor} type="color" />
          <br />
          <h5 style={{ display: "inline-block" }}>Back-ground color: </h5>{" "}
          <input value={bg} onChange={handleBgColor} type="color" />
        </div>
        <br />
        <div style={{ display: show }} className="text-center">
          <button
            className="btn btn-warning"
            style={{ marginBottom: "10px" }}
            onClick={getImage}
          >
            Take screenshot
          </button>
        </div>
        <div style={{display:linkdisplay}}>
          <div className="text-center">
            <h5>Preview</h5>
            <img className="image-fluid" src={image} />
          </div>
          <br />
          <a download={"QRcodeGenerator"} href={image}>
            <h3 className="text-center">Download Screenshot</h3>
          </a>
      <br/>
      <div>
        <p >&#169;2024 Rojo's Ltd | All Rights Are Reserved</p>
      </div>
        </div>
      </div>
    </div>
  );
}
