import React from "react";

import "./Table.scss";

const Table = ({ headers, body }) => {
  return (
    <div>
      <table style={{}}>
        <thead>
          {headers?.map((head, i) => (
            <th key={i}>{head}</th>
          ))}
        </thead>
        <tbody>
          {body?.map((row, i) => (
            <tr key={i}>
              {row.map((data, i) => (
                <td key={i}>{data}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
