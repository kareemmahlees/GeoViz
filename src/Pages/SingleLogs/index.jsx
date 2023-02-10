import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteLog, getLogDetails } from "../../redux/services";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Papa from "papaparse";
import { Table } from "../../Components";
import { Error, Loading } from "../";

import "./SingleLogs.scss";

const SingleLogs = () => {
  const dispatch = useDispatch();
  const { loading, error, details, deleting } = useSelector(
    (state) => state.logs
  );
  const [data, setData] = useState(null);
  const id = useParams().logsID;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (id) {
      dispatch(getLogDetails(id));
    }
  }, [dispatch, id]);
  useEffect(() => {
    if (details) {
      Papa.parse(details, {
        complete: function (results) {
          setData(results.data);
        },
      });
    }
  }, [details]);

  if (error) return <Error />;
  if (loading) return <Loading />;

  return (
    <div>
      {data && <Table headers={data[0]} body={data?.slice(1)} />}
      <Link to="edit" className="main__button solid">
        Edit
      </Link>
      <button
        className="delete__button"
        onClick={async () => {
          await dispatch(deleteLog(id)).then((res) =>
            navigate(
              `${location.pathname.slice(
                0,
                location.pathname.lastIndexOf("/")
              )}`
            )
          );
        }}
      >
        {deleting ? "Deleting" : "Delete"}
      </button>
    </div>
  );
};

export default SingleLogs;
