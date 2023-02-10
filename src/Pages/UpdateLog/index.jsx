import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Table } from "../../Components";
import { useSelector, useDispatch } from "react-redux";
import { getLogDetails, updateLog } from "../../redux/services";
import Papa from "papaparse";
import {
  useCSVReader,
  lightenDarkenColor,
  formatFileSize,
} from "react-papaparse";

const GREY = "#CCC";
const GREY_LIGHT = "rgba(255, 255, 255, 0.4)";
const DEFAULT_REMOVE_HOVER_COLOR = "#A01919";
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
  DEFAULT_REMOVE_HOVER_COLOR,
  40
);
const GREY_DIM = "#686868";

const styles = {
  zone: {
    alignItems: "center",
    border: `2px dhed ${GREY}`,
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    padding: 20,
  },
  file: {
    background: "linear-gradient(to bottom, #EEE, #DDD)",
    borderRadius: 20,
    display: "flex",
    height: 120,
    width: 120,
    position: "relative",
    zIndex: 10,
    flexDirection: "column",
    justifyContent: "center",
  },
  info: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    paddingLeft: 10,
    paddingRight: 10,
  },
  size: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    marginBottom: "0.5em",
    justifyContent: "center",
    display: "flex",
  },
  name: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    fontSize: 12,
    marginBottom: "0.5em",
  },
  progressBar: {
    bottom: 14,
    position: "absolute",
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
  },
  zoneHover: {
    borderColor: GREY_DIM,
  },
  default: {
    borderColor: GREY,
  },
  remove: {
    height: 23,
    position: "absolute",
    right: 6,
    top: 6,
    width: 23,
  },
};

const UpdateLog = () => {
  const location = useLocation();
  const name = location.state?.name;
  const [file, setFile] = useState(null);
  const [mainFile, setMainFile] = useState(null);
  const { CSVReader } = useCSVReader();
  const [zoneHover, setZoneHover] = useState(false);
  const [removeHoverColor, setRemoveHoverColor] = useState(
    DEFAULT_REMOVE_HOVER_COLOR
  );
  const locatin = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, msg, details, saving } = useSelector(
    (state) => state.logs
  );

  // console.log(locatin.pathname.split("/")[4]);

  useEffect(() => {
    dispatch(getLogDetails(locatin.pathname.split("/")[4]));
  }, [dispatch, locatin.pathname]);

  useEffect(() => {
    if (details) {
      setMainFile(details);
      Papa?.parse(details, {
        complete: function (results) {
          setFile(results);
        },
      });
    }
  }, [details]);

  if (loading) {
    return <h1>Loading...!</h1>;
  }

  return (
    <div>
      <h2 className="page__title">{name}</h2>
      <CSVReader
        onUploadAccepted={(results, main) => {
          setFile(results);
          setZoneHover(false);
          setMainFile(main);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setZoneHover(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setZoneHover(false);
        }}
      >
        {({
          getRootProps,
          acceptedFile,
          ProgressBar,
          getRemoveFileProps,
          Remove,
        }) => (
          <>
            <div
              {...getRootProps()}
              style={Object.assign(
                {},
                styles.zone,
                zoneHover && styles.zoneHover
              )}
            >
              {acceptedFile ? (
                <>
                  <div style={styles.file}>
                    <div style={styles.info}>
                      <span style={styles.size}>
                        {formatFileSize(acceptedFile.size)}
                      </span>
                      <span style={styles.name}>{acceptedFile.name}</span>
                    </div>
                    <div style={styles.progressBar}>
                      <ProgressBar />
                    </div>
                    <div
                      {...getRemoveFileProps()}
                      style={styles.remove}
                      onMouseOver={(event) => {
                        event.preventDefault();
                        setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
                      }}
                      onMouseOut={(event) => {
                        event.preventDefault();
                        setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                      }}
                    >
                      <Remove color={removeHoverColor} />
                    </div>
                  </div>
                </>
              ) : (
                <div className="add__file__btn">
                  Drop CSV file here or click to upload
                </div>
              )}
            </div>
          </>
        )}
      </CSVReader>
      <div className="line" />
      <h2 className="section__title">Preview</h2>
      {file && <Table headers={file?.data[0]} body={file?.data.slice(1)} />}
      <div className="line" />
      <button
        type="button"
        className="main__button solid"
        onClick={async () => {
          await dispatch(
            updateLog({ file: mainFile, id: locatin.pathname.split("/")[4] })
          ).then((res) => {
            if (!res?.payload?.error && !res?.error) {
              navigate(
                locatin.pathname.slice(0, locatin.pathname.lastIndexOf("/"))
              );
            }
            console.log(res);
          });
        }}
      >
        {saving ? "Saving...!" : "save"}
      </button>
      {error && <p>{error.message}</p>}
      {msg && <p>{msg}</p>}
    </div>
  );
};

export default UpdateLog;