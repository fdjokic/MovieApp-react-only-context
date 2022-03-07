import React from "react";

const Empty = () => {
  return (
    <div>
      {/* EMPTY ARRAY MESSAGE */}
      <h1 style={{ textAlign: "center", color: "red" }}>
        No movies match your search criteria.
      </h1>
    </div>
  );
};

export default Empty;
