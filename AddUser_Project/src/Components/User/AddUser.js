import React, { useState } from "react";
import Card from "../UI/Card";
import styles from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  const [enteredUserName, setEnteredUserName] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const[error,setError] = useState();

  const addUserHandler = (event) => {
    
    event.preventDefault();
    if(typeof(enteredUserName) === typeof(enteredAge)){
        setError({
            title:"Invalid Input",
            message:"Please Enter a valid name (it must be a String)."
        })
        return;
    }
    if(enteredUserName.trim().length ===0 || enteredAge.trim().length===0){
        setError({
            title:"Invalid Input",
            message:"Please Enter a valid name and age(non-empty values)."
        })
        return;
    }
    if(enteredAge<1){
        setError({
            title:"Invalid Input",
            message:"Please Enter a valid age (greater than 0)."
        })
        return;
    }
    props.onAddUser(enteredUserName, enteredAge);
    setEnteredUserName("");
    setEnteredAge("");
  };

  const userNameChangeHandler = (event) => {
    setEnteredUserName(event.target.value);
  };

  const userAgeChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };
  const errorHandler=()=>{
      setError(null);
  }
  return (
      <div>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler }/>}
    <Card className={styles.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          onChange={userNameChangeHandler}
          value={enteredUserName}
        ></input>

        <label htmlFor="age">Age (Years)</label>
        <input
          id="age"
          type="number"
          value={enteredAge}
          onChange={userAgeChangeHandler}
        ></input>
        <Button type="submit">Add User</Button>
      </form>
      </Card>
    </div>
  );
};
export default AddUser;
