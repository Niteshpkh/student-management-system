import { useEffect, useState } from "react";
import api from "../../api/axios";

const MyStudentDetails = () => {
    const [student, setStudent] = useState(null);

    useEffect(() => {
        api.get("/student_data/me")
            .then(response => {
                console.log("MY STUDENT:", response.data);
                setStudent(response.data);
            })
            .catch(error => {
                console.log("Error:", error);
            });
    }, []);

    if (!student) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>My Details</h2>

            <p>Name: {student.name}</p>
            <p>Age: {student.age}</p>
            <p>Grade: {student.grade}</p>
            <p>Parents Name: {student.parents_name}</p>
            <p>Contact: {student.contact_no}</p>
        </div>
    );
};

export default MyStudentDetails;