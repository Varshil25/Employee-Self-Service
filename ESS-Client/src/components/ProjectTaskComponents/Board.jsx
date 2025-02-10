import React, { useEffect, useState } from "react";
import Column from "./Column";
import { dummyCards } from "../utils/dummyCardData";
import { columnArray } from "../utils/teskColumns";
import { useGlobalContext } from "../../context/appContext";
import { useParams } from "react-router-dom";
import CustomAlert from "../utils/CustomAlert";

function Board({ selectedProject, searchInput }) {
  const { authFetch, showAlert, role, userId } = useGlobalContext();
  const { projectId } = useParams();

  const [isMember, setIsMember] = useState(false);
  //   const [cards, setCards] = useState(dummyCards);
  const [cards, setCards] = useState([]);
  const [taskUpdate, setTaskUpdate] = useState(false);
  const [allCards, setAllCards] = useState(cards);

  const getAllTasksOfCurrentProject = () => {
    authFetch(`/task/${projectId}`)
      .then((res) => {
        setCards(res.data);
        setAllCards(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (searchInput?.trim().length > 0) {
      authFetch
        .get(`/task/${projectId}/${searchInput.trim()}`)
        .then((res) => setCards(res.data))
        .catch((err) => console.log(err));
    } else {
      setCards(allCards);
    }
  }, [searchInput]);

  useEffect(() => {
    getAllTasksOfCurrentProject();
  }, [taskUpdate]);

  /*useEffect(() => {
    if(searchInput.length >= 3){
      for(let i = 0; i < allCards.length; i++){
        if(allCards[i].title.toLowerCase().includes(searchInput.toLowerCase())){
          setCards([allCards[i]]);
        }
      }
    }
  }, [searchInput]);*/

  return (
    <div className="h-full w-full flex gap-3 overflow-scroll">
      {/* ------ Display alert start ------ */}
      {showAlert && (
        <div className="absolute right-10 z-50">
          <CustomAlert />
        </div>
      )}
      {/* ------ Display alert end ------ */}
      {/* {role === "admin" || isMember ? ( */}
      {columnArray.map((clm) => (
        <Column
          column={clm.column}
          title={clm.title}
          headingColor={clm.headingColor}
          cards={cards}
          setCards={setCards}
          key={clm.title}
          setTaskUpdate={setTaskUpdate}
          selectedProject={selectedProject}
        />
      ))}
      {/* // ) : (
      //   <div className="relative top-20 text-red-500 flex align-middle text-center justify-center text-3xl">
      //     <h1>You are not member of this project</h1>
      //   </div>
      // )} */}
    </div>
  );
}

export default Board;
