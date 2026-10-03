let editingId = null;

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

    if (name.trim() === "" || age === "" || course.trim() === "") {
    alert("Please fill all fields!");
    return;
}

    // UPDATE
    if (editingId !== null) {

        fetch(`http://127.0.0.1:8000/api/students/${editingId}/`, {
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

            // Form clear
            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("course").value = "";

            // Add mode par wapas
            editingId = null;

            document.getElementById("submitBtn").textContent = "Add Student";
            document.getElementById("formTitle").textContent = "Add Student";

            getStudents();
        });

        return;
    }


    // ADD
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

        // Add hone ke baad inputs clear
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("course").value = "";

        getStudents();
    });
}


function editStudent(id) {

    // Pehle students ko API se get karenge
    fetch(`http://127.0.0.1:8000/api/students/${id}/`)
        .then(response => response.json())
        .then(student => {

            // Data input boxes mein aa jayega
            document.getElementById("name").value = student.name;
            document.getElementById("age").value = student.age;
            document.getElementById("course").value = student.course;

             document.getElementById("name").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    document.getElementById("name").focus();

            // ID save kar lo
            editingId = student.id;

            // Button change
            document.getElementById("submitBtn").textContent = "Update Student";

            // Heading change
            document.getElementById("formTitle").textContent = "Edit Student";
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
    .then(response => {

        if (response.ok) {
            alert("Student deleted successfully!");
            getStudents();
        }

    });
}

const params = new URLSearchParams(window.location.search);
const editId = params.get("edit");

if (editId) {
    editStudent(editId);
}