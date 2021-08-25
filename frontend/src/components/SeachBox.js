import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
function SeachBox({ history }) {
  const [keyword, setKeyword] = useState("");

  const submitHandeler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <>
      <Form onSubmit={submitHandeler} inline>
        <input
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search Products ..."
          className="re-sm-2 ml-sm-5"
        ></input>
        <Button type="submit" variant="outline-success" className="p-2 mx-3 ">
          Search
        </Button>
      </Form>
    </>
  );
}

export default SeachBox;
