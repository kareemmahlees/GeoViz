import React from "react";

import "./Table.scss";

const Table = ({ headers, body }) => {
  return (
    <div className="table__container">
      <table className="table">
        <tr>
          {headers?.map((head, i) => (
            <th key={i}>{head}</th>
          ))}
        </tr>
        {body?.map((row, i) => (
          <tr key={i}>
            {row.map((data, i) => (
              <td key={i}>{data}</td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Table;
