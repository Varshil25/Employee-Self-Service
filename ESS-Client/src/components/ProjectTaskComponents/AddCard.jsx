import React, { useState } from "react";
import PostAddIcon from "@mui/icons-material/PostAdd";
import BasicModal from "../BasicModal";
import { motion } from "framer-motion";
import AddTaskModal from "./AddTaskModal";

function AddCard({ column, setCards, setTaskUpdate }) {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const handleClose = () => {
    setAdding(false);
  };
  const handleOpen = () => {
    setAdding(true);
  };
  return (
    <>
      {adding ? (
        <AddTaskModal
          layout
          handleClose={handleClose}
          handleOpen={handleOpen}
          open={adding}
          setOpen={setAdding}
          column={column}
          setTaskUpdate={setTaskUpdate}
        />
      ) : (
        <motion.button
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add task</span>
          <PostAddIcon />
        </motion.button>
      )}
    </>
  );
}

export default AddCard;
