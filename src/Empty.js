import React from "react";

// const emptyVariants = {
//   hidden: {
//     opacity: 0,
//   },
//   visible: {
//     opacity: 1,
//     transition: {
//       delay: 3,
//     },
//   },
//   exit: {
//     opacity: 0,
//     transition: {
//       duration: 0.1,
//     },
//   },
// };

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
