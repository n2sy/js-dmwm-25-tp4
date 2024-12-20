let olList = document.getElementById("list-tasks");

document.getElementById("input-title").hidden = true;
document.getElementById("btn-cancel").hidden = true;

async function getAllTasks() {
  //   fetch("http://localhost:3000/tasks")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);

  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  let response = await fetch("http://localhost:3000/tasks");
  let data = await response.json();
  console.log(data);
  convertTaskToLi(data);

  console.log("Nadim Treatment");
}

function updateTask(previousValueChecked, taskId) {
  fetch(`http://localhost:3000/tasks/${taskId}`, {
    method: "PATCH",
    body: JSON.stringify({
      checked: !previousValueChecked,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      alert("Task updated");
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteTask(taskId) {
  fetch(`http://localhost:3000/tasks/${taskId}`, {
    method: "DELETE",
  })
    .then((res) => {
      alert("Task Deleted");
    })
    .catch((err) => {
      console.log(err);
    });
}

function convertTaskToLi(arrayTasks) {
  for (const task of arrayTasks) {
    let newLi = document.createElement("li");
    newLi.className = "list-group-item";
    let newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    newCheckbox.checked = task.checked;
    newCheckbox.style.marginRight = "10px";
    newCheckbox.addEventListener("change", () => {
      updateTask(task.checked, task.id);
    });

    newLi.appendChild(newCheckbox);

    let newP = document.createElement("span");
    newP.textContent = task.title;
    newLi.appendChild(newP);
    if (task.checked) newP.style.textDecoration = "line-through";

    let newSpan = document.createElement("span");
    newSpan.className = "badge text-bg-secondary";
    let d = new Date(task.date_c);
    newSpan.textContent = `${d.getHours()}:${d.getMinutes()}`;
    newSpan.style.marginLeft = "10px";
    newLi.appendChild(newSpan);

    newLi.addEventListener("dblclick", () => {
      if (confirm("Etes-vous sur de vouloir supprimer ce task ?"))
        deleteTask(task.id);
    });

    olList.appendChild(newLi);
  }
}

getAllTasks();

document.getElementById("btn-add").addEventListener("click", () => {
  document.getElementById("input-title").hidden = false;
  document.getElementById("btn-cancel").hidden = false;

  document.getElementById("btn-add").hidden = true;
});

document.getElementById("btn-cancel").addEventListener("click", () => {
  document.getElementById("input-title").hidden = true;
  document.getElementById("btn-cancel").hidden = true;
  document.getElementById("btn-add").hidden = false;
});

document.getElementById("input-title").addEventListener("change", () => {
  console.log(document.getElementById("input-title").value);
  document.getElementById("input-title").hidden = true;
  document.getElementById("btn-cancel").hidden = true;
  document.getElementById("btn-add").hidden = false;
  addTask(document.getElementById("input-title").value);
});

function addTask(newTitle) {
  fetch("http://localhost:3000/tasks", {
    method: "POST",
    body: JSON.stringify({
      id: crypto.randomUUID(),
      title: newTitle,
      checked: false,
      date_c: new Date(),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      alert("Task Added successfully");
    })
    .catch((err) => {
      console.log(err);
    });
}
