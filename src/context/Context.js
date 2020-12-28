import React, { createContext, useState } from "react";

const Context = createContext({
  user: null,
  room: null,
});

function ContextProvider({ children }) {
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");

  function setContext(user, room) {
    setUser(user);
    setRoom(room);
  }

  return (
    <Context.Provider value={{ user, room, setContext }}>
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
