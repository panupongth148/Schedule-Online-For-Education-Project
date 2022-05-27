import React from "react";

const Subject = (props) => {
  return (
    <tr>
      <td>{props.subject.date}</td>
      <td>{props.subject.subjectName}</td>
      <td>{props.subject.time}</td>
      <td>
        <a href={props.subject.link} target="_blank">
          {props.subject.link}
        </a>
      </td>
      <td>
        <button
          type="button"
          class="btn btn-danger"
          onClick={() => {
            props.deleteSubjectById(props.subject._id);
          }}
        >
          ลบ
        </button>
      </td>
    </tr>
  );
};

export default Subject;
