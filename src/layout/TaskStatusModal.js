import Modal from "./Modal";
import classes from "./TaskStatusModal.module.css";

const TaskStatusModal = ({ status, onClose, onConfirmDelete }) => {
  let message;
  let showConfirmation = false;

  switch (status) {
    case "completed":
      message = "Task Marked as completed!";
      break;
    case "failed":
      message = "Task Marked as failed!";
      break;
    case "deleted":
      message = "Are you sure you want to delete this task?";
      showConfirmation = true;
      break;
    default:
      message = "Task status updated!";
  }
  return (
    <Modal onClose={onClose}>
      <div className={classes.modal}>
        <p>{message}</p>
        {showConfirmation && (
          <div>
            <button className={classes.btn} onClick={onConfirmDelete}>
              Yes
            </button>
            <button className={classes.btn} onClick={onClose}>
              No
            </button>
          </div>
        )}
        {!showConfirmation && (
          <button className={classes.btn} onClick={onClose}>
            Close
          </button>
        )}
      </div>
    </Modal>
  );
};

export default TaskStatusModal;
