let studentsData = [];


// GET STUDENTS
function getStudents() {

    fetch("http://127.0.0.1:8000/api/students/")
        .then(response => response.json())
        .then(data => {

            studentsData = data;

            let output = "";

            data.forEach(student => {

                output += `
                    <div class="student-card">

                        <h3>${student.name}</h3>

                        <p><strong>ID:</strong> ${student.id}</p>

                        <p><strong>Age:</strong> ${student.age}</p>

                        <p><strong>Course:</strong> ${student.course}</p>

                        <div class="student-buttons">

                            <button onclick="editStudent(${student.id})">
                                Edit
                            </button>

                            <button onclick="deleteStudent(${student.id})">
                                Delete
                            </button>

                        </div>

                    </div>
                `;
            });

            document.getElementById("students").innerHTML = output;
        })
        .catch(error => {

            console.error("Error:", error);

            document.getElementById("students").innerHTML =
                "<p>Unable to load students.</p>";
        });
}


// EDIT STUDENT
function editStudent(id) {

    window.location.href = `index.html?edit=${id}`;
}


// DELETE STUDENT
function deleteStudent(id) {

    let confirmDelete =
        confirm("Are you sure you want to delete this student?");

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


// DOWNLOAD STUDENTS
function downloadStudents() {

    let csv = "ID,Name,Age,Course\n";

    studentsData.forEach(student => {

        csv += `${student.id},${student.name},${student.age},${student.course}\n`;

    });

    let blob = new Blob([csv], {
        type: "text/csv"
    });

    let url = URL.createObjectURL(blob);

    let link = document.createElement("a");

    link.href = url;

    link.download = "students.csv";

    link.click();

    URL.revokeObjectURL(url);
}


// LOAD STUDENTS
getStudents();