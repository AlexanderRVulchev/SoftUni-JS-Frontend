function attachEvents() {
  const baseUrl = "http://localhost:3030/jsonstore/collections/students";
  const inputFields = Array.from(document.getElementsByTagName("input"));
  const submitButton = document.getElementById("submit");
  const tbodyElement = document.getElementsByTagName("tbody")[0];

  displayAllStudents();
  submitButton.addEventListener("click", submitNewStudent)

  async function displayAllStudents() {
    tbodyElement.innerHTML = "";
    const response = await fetch(baseUrl);
    const students = await response.json();
    for (const student of Object.values(students)) {
      const rowElement = generateNewTableRow(student);
      tbodyElement.appendChild(rowElement);
    }
  }

  function generateNewTableRow(student) {
    const createTdElement = (propertyName) => {
      const td = document.createElement("td");
      td.textContent = propertyName === "grade" ? Number(student[propertyName]).toFixed(2) : student[propertyName];
      return td;
    }

    const tr = document.createElement("tr");
    tr.appendChild(createTdElement("firstName"));
    tr.appendChild(createTdElement("lastName"));
    tr.appendChild(createTdElement("facultyNumber"));
    tr.appendChild(createTdElement("grade"));
    return tr;
  };

  async function submitNewStudent() {
    for (const input of inputFields) {
      if (!input.value) { 
        return;
      };
    }
  
    const firstName = inputFields[0].value;
    const lastName = inputFields[1].value;
    const facultyNumber = inputFields[2].value;
    const grade = inputFields[3].value;
  
    const newStudentEntry = {
      firstName, lastName, facultyNumber, grade
    }

    await fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify(newStudentEntry)      
    });

    displayAllStudents();
  }
}

attachEvents();