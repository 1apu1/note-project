import React,{ useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import icons from "../../assets/Icons";
import { MdOutlinePushPin, MdPushPin } from "react-icons/md";
import {
  handlePinn,
  movetoRecycleBin,
  undeletedNotes,
} from "../../assets/StorageData";
import { useNavigate } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import Swal from "sweetalert2";
import DetailedNote from "../../assets/DetailedNote";

function CardsData() {
  const [showNotes, setshowNotes] = useState([]);
  const navigate = useNavigate();

  const handleDelete = (index, event) => {
    let updateNotes = [...showNotes];
    updateNotes[index].isDeleted = !updateNotes[index].isDeleted;
    movetoRecycleBin(updateNotes[index].Id);
    const arr = updateNotes.filter((_, i) => i !== index);
    setshowNotes([...arr]);
    event.stopPropagation();
  };
  const handleFavorite = (i) => {
    const updatedNotes = [...showNotes];
    updatedNotes[i].isFavorite = !updatedNotes[i].isFavorite;
    localStorage.setItem("Notes", JSON.stringify(updatedNotes));
    setshowNotes(updatedNotes);
  };

  const handleEdit = (i) => {
    const noteToEdit = showNotes[i];
    navigate("/addnotes", { state: { note: noteToEdit, index: i } });
  };

  const setpin = (index, e) => {
    e.stopPropagation();
    let updatedNotes = [...showNotes];
    updatedNotes[index].ispinned = !updatedNotes[index].ispinned;
    handlePinn(updatedNotes[index].Id);
    setshowNotes(updatedNotes);
  };

  const handleDetails = (i) => {
    let obj = showNotes[i];
    Swal.fire({
      html: ReactDOMServer.renderToString(<DetailedNote obj={obj} />),
      width: "50%",
      showConfirmButton: false,
    });
  };

  useEffect(() => {
    const storedNotes = undeletedNotes() || [];
    setshowNotes(storedNotes.length > 0 ? storedNotes : []);
  }, []);

  return (
    <div className="container-fluid p-0">
      <div className="row gap-1 justify-content-center p-0">
        {showNotes.length > 0 ? (
          showNotes.map((note, i) => {
            return (
              <div
                key={note?.Id || i}
                onClick={() => {
                  handleDetails(i);
                }}
                className="col-md-3 rounded-3 shadow p-4"
              >
                {note.ispinned ? (
                  <MdPushPin
                    cursor={"pointer"}
                    onClick={(e) => {
                      setpin(i, e);
                    }}
                  />
                ) : (
                  <MdOutlinePushPin
                    cursor={"pointer"}
                    onClick={(e) => {
                      setpin(i, e);
                    }}
                  />
                )}
                <h5>
                  {note?.task?.length > 18
                    ? note.task.slice(0, 18) + "...."
                    : note.task || "No Task"}
                </h5>
                <p>
                  {note?.description?.length > 20
                    ? note.description.slice(0, 20) + "..."
                    : note.description || "No Description"}
                </p>
                <div className="text-center my-2">
                  {note.ico !== "" &&
                    icons[note.ico] &&
                    React.createElement(icons[note.ico], { size: 20 })}
                </div>

                <div className="d-flex flex-wrap justify-content-between">
                  <button className="btn py-0 btn-sm btn-outline-dark" disabled>
                    {note.priority}
                  </button>
                  <p className="fw-bold">{note.day}</p>
                </div>
                <div className="d-flex justify-content-end">
                  <div className="btn btn-sm fs-5">
                    <CiEdit
                      onClick={() => {
                        handleEdit(i);
                      }}
                    />
                  </div>
                  <div cursor="pointer" className="btn btn-sm fs-5">
                    <AiOutlineDelete
                      onClick={(event) => {
                        handleDelete(i, event);
                      }}
                    />
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div
                      className="btn btn-sm fs-5"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFavorite(i);
                      }}
                    >
                      {note.isFavorite ? (
                        <AiFillHeart color="red" />
                      ) : (
                        <AiOutlineHeart />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-danger">Koi Note Nhi Hai</p>
        )}
      </div>
    </div>
  );
}

export default CardsData;
