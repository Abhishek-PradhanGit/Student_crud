function getStudents() {

    fetch("http://127.0.0.1:8000/api/students/")
        .then(response => response.json())
        .then(data => {

            let output = "";

            data.forEach(student => {
                output += `
                    <p>
                        ID: ${student.id} |
                        Name: ${student.name} |
                        Age: ${student.age} |
                        Course: ${student.course}
                        
                        <button onclick="editStudent(${student.id})">
                            Edit
                        </button>

                        <button onclick="deleteStudent(${student.id})">
                         Delete
                        </button>
                    </p>
                `;
            });

            document.getElementById("students").innerHTML = output;

        });
}

function addStudent() {

    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let course = document.getElementById("course").value;

    fetch("http://127.0.0.1:8000/api/students/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            age: age,
            course: course
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert("Student added successfully!");

        getStudents();
    });
}

function editStudent(id) {

    let name = prompt("Enter new name:");
    let age = prompt("Enter new age:");
    let course = prompt("Enter new course:");

    fetch(`http://127.0.0.1:8000/api/students/${id}/`, {
        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name: name,
            age: age,
            course: course
        })
    })
    .then(response => response.json())
    .then(data => {

        console.log(data);

        alert("Student updated successfully!");

        getStudents();
    });
}

function deleteStudent(id) {

    let confirmDelete = confirm("Are you sure you want to delete this student?");

    if (!confirmDelete) {
        return;
    }

    fetch(`http://127.0.0.1:8000/api/students/${id}/`, {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {

        console.log(data);

        alert("Student deleted successfully!");

        getStudents();
    });
}