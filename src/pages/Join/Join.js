import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";

import { Context } from "../../context/Context";
import "./Join.css";

export default function Join() {
  const [state, setState] = useState({ user: "", room: "" });
  const history = useHistory();
  const context = useContext(Context);

  function handleChange(e) {
    e.preventDefault();

    setState({ ...state, [e.target.name]: e.target.value });
  }

  function handleclick(e) {
    context.setContext(state["user"], state["room"]);
    history.push("/chat");
  }
  return (
    <div className="container">
      <h1>Fala comigo bb</h1>
      <Form className="form">
        <h2>Entre na sala</h2>
        <Form.Group>
          <Form.Label>
            Nome
            <Form.Control
              name="user"
              value={state["user"]}
              onChange={handleChange}
            />
          </Form.Label>
        </Form.Group>

        <Form.Group>
          <Form.Label>
            Sala
            <Form.Control
              name="room"
              value={state["room"]}
              onChange={handleChange}
            />
          </Form.Label>
        </Form.Group>

        <button
          onClick={handleclick}
          variant="danger"
          className="enter-btn"
          type="button"
        >
          Entrar
        </button>
      </Form>
    </div>
  );
}
