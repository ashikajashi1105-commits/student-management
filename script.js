const API = "http://localhost:5000/students";

// Add student
function addStudent() {
    const student = {
        name: document.getElementById("name").value,
        course: document.getElementById("course").value,
        mark: document.getElementById("mark").value
    };

    fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    })
    .then(res => res.json())
    .then(() => loadStudents());
}


// View students
function loadStudents() {
    fetch(API)
        .then(res => res.json())
        .then(data => {
            document.getElementById("students").innerHTML =
                data.map(s => `
                    <p>
                        ${s.name} - ${s.course} - ${s.mark}

                        <button onclick="editStudent('${s._id}')">
                            Edit
                        </button>

                        <button onclick="deleteStudent('${s._id}')">
                            Delete
                        </button>
                    </p>
                `).join("");
        });
}


// Edit student
function editStudent(id) {

    const name = prompt("Enter new name:");
    const course = prompt("Enter new course:");
    const mark = prompt("Enter new mark:");

    if (!name || !course || !mark)
        return;

    fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            course: course,
            mark: mark
        })
    })
    .then(res => res.json())
    .then(() => {
        loadStudents();
        alert("Student updated successfully!");
    });
}


// Delete student
function deleteStudent(id) {

    fetch(`${API}/${id}`, {
        method: "DELETE"
    })
    .then(() => loadStudents());
}

function searchStudents() {
    const value = document.getElementById("search").value.toLowerCase();

    fetch(API)
        .then(res => res.json())
        .then(data => {
            const result = data.filter(s =>
                s.name.toLowerCase().includes(value)
            );

            document.getElementById("students").innerHTML =
                result.map(s => `
                    <p>
                        ${s.name} - ${s.course} - ${s.mark}
                        <button onclick="editStudent('${s._id}')">Edit</button>
                        <button onclick="deleteStudent('${s._id}')">Delete</button>
                    </p>
                `).join("");
        });
}


// Load students when page opens
loadStudents();