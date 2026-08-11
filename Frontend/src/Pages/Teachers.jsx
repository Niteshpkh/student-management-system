import React, { useEffect, useState } from 'react'
import DataTable from '../Components/DataTable';
import axios from 'axios';
const Teachers = () => {
  const [teacher, setTeacher] = useState({
    teachers_name: "",
    email: "",
    qualification: "",
    teacher_phone_no: "",
    Subject: ""
  });
  const handleChange = (e) =>{
    const {name,value} =e.target;
    setTeacher({
      ...teacher,
      [name]:value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(teacher);
    await axios.post("http://localhost:8080/teacher_data", teacher);
    getTeachers();
    setTeacher({
      teachers_name: "",
    email: "",
    qualification: "",
    teacher_phone_no: "",
    Subject: ""

    })
  }
  const [teachers, setTeachers] = useState([]);
  const columns = [
    {label : "Name" , key :"teachers_name"},
    {label : "Email" , key : "email"},
    {label : "Qualification" , key : "qualification"},
    {label : "phone" , key : "teacher_phone_no"},
    {label : "Subject" , key : "Subject"}
  ];
  const getTeachers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/teacher_data");
      setTeachers(response.data);
    }
    catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/teacher_data/${id}`);
      getTeachers();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getTeachers();
  }, []);
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
  <input
    type="text"
    name="teachers_name"
    value={teacher.teachers_name}
    placeholder="Teacher Name"
    onChange={handleChange}
  />

  <input
    type="email"
    name="email"
    value={teacher.email}
    placeholder="Email"
    onChange={handleChange}
  />

  <input
    type="text"
    name="qualification"
    value={teacher.qualification}
    placeholder="Qualification"
    onChange={handleChange}
  />

  <input
    type="number"
    name="teacher_phone_no"
    value={teacher.teacher_phone_no}
    placeholder="Phone Number"
    onChange={handleChange}
  />

  <input
    type="text"
    name="Subject"
    value={teacher.Subject}
    placeholder="Subject"
    onChange={handleChange}
  />

  <button type="submit">Add Teacher</button>
</form>
      <DataTable columns={columns} data={teachers} onDelete={handleDelete} />
    </div>
  )
}

export default Teachers