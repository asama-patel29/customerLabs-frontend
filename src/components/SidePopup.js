import React, { useState } from "react";
import axios from "axios";
import { AddSegmentData, DropDownData, traitColors } from "./Schema";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/joy/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ToastContainer, toast } from "react-toastify";
import "./SidePopup.css";
import "react-toastify/dist/ReactToastify.css";

const SidePopup = (props) => {
  const [dropDown, setDropDown] = useState([]);
  const [input, setInput] = useState("");
  const [defaultDropdown, setDefaultDropdown] = useState(DropDownData);
  const [select, setSelect] = useState("");

  const AddSchema = () => {
    if (select === "add") {
      return;
    } else if (select === "") {
      toast("please select the field ");
      return;
    }
    let Data1 = defaultDropdown.filter((e) => Object.keys(e)[0] === select);
    setDropDown([...dropDown, Data1[0]]);

    let Data2 = defaultDropdown.filter((e) => Object.keys(e)[0] !== select);
    setDefaultDropdown(Data2);

    setSelect("add");
  };

  const handleClick_Back = () => {
    props.pop(false);
  };

  const innerList = (key) => {
    return AddSegmentData.filter((e) => key[0] === Object.keys(e)[0]);
  };

  const SaveSegment = (e) => {
    e.preventDefault();
    console.log(input);
    if (input === "") {
      toast("fill the name of the segment");
      return;
    } else if (dropDown[0] === "") {
      toast("please select the field");
    }

    let obj = {
      segment_name: input,
      schema: dropDown,
    };
    axios
      .post(
        "https://webhook.site/dbb06767-f486-4e2d-abb6-39284b74c14b",
        JSON.stringify(obj)
      )
      .then((e) => console.log(e))
      .catch((err) => console.log(err));

    alert("data posted successfully");

    setDropDown([]);
    setDefaultDropdown(DropDownData);
    props.pop(false);
  };

  const listFn = (e) => {
    let id = e.target.id;
    let value = e.target.value;

    let data = dropDown.map((e) =>
      Object.keys(e)[0] === id ? { [id]: value } : e
    );

    setDropDown(data);
  };

  const cancelFn = () => {
    setDropDown([]);
    setDefaultDropdown(DropDownData);
    props.pop(false);
  };

  const removefn = (e, i) => {
    dropDown.splice(i, 1);
    const arr = [...dropDown];
    setDropDown(arr);
    const option = [...defaultDropdown];

    option.push(e);

    setDefaultDropdown(option);
  };

  return (
    <div className="popUp-container">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="header">
        <ArrowBackIosIcon onClick={handleClick_Back} />
        Saving segment
      </div>
      <div className="body">
        <label htmlFor="name">Enter the name of the segment</label>
        <input
          type="text"
          id="name"
          placeholder="Name of the segment"
          onChange={(e) => setInput(e.target.value)}
        />
        <br />
        <label>
          To Save your segment, you need to add the schemas
          <br />
          to build query
        </label>
        <div className="traits_container">
          <div className="trait_green"></div>
          <span>&nbsp;- User Traits</span>
          &nbsp;
          <div className="trait_red"></div>
          <span>&nbsp;- Group Traits</span>
        </div>
        {dropDown[0] && (
          <div className="border-outline">
            {dropDown.map((e, i) => {
              let List = innerList(Object.keys(e));
              const trait = Object.keys(e)[0];
              return (
                <span
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  <div
                    key={`trait-${i}`}
                    style={{
                      width: "10px",
                      height: "10px",
                      backgroundColor: traitColors[trait],
                      marginRight: "5px",
                      borderRadius: "5px",
                    }}
                  ></div>

                  <select
                    key={i}
                    id={trait}
                    onChange={listFn}
                    className="select-option"
                  >
                    {Object.values(List[0])[0].map((e, i) => (
                      <option key={"arr" + i}>{e}</option>
                    ))}
                  </select>
                  <IconButton variant="soft" onClick={() => removefn(e, i)}>
                    <RemoveIcon />
                  </IconButton>
                </span>
              );
            })}
          </div>
        )}

        <select value={select} onChange={(e) => setSelect(e.target.value)}>
          {defaultDropdown.map((e, i) => (
            <option key={"List" + i} value={Object.keys(e)[0]}>
              {Object.values(e)[0]}
            </option>
          ))}
        </select>

        {select && (
          <button className="link" onClick={AddSchema}>
            +<u style={{ gap: "10px" }}>Add new schema</u>
          </button>
        )}
      </div>
      <div className="bottom">
        <button className="btnsave" type="submit" onClick={SaveSegment}>
          Save the Segment
        </button>
        <button className="btncancel" onClick={cancelFn}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SidePopup;
