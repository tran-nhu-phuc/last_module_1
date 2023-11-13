let array = [
  {
    id: 0,
    content: "quét nhà",
    status: false,
  },
];
let index;
if (!JSON.parse(localStorage.getItem("project"))) {
  localStorage.setItem("project", JSON.stringify(array));
}
function render() {
  let local = JSON.parse(localStorage.getItem("project"));
  let list = document.querySelector(".renderList");
  let length = document.querySelector("#lengthList");
  list.innerHTML = "";
  for (let i = 0; i < local.length; i++) {
    list.innerHTML += ` <li class="list">
          <div class="left">
            <input type="checkbox" placeholder="a" onclick="done(${i})" id="checkBox" />
            <label for="checkBox" id="done">${local[i].content}</label>
          </div>
          <div class="right">
            <i class="fa-solid fa-pen" onclick="editTodoList(${i})"></i>
            <i class="fa-solid fa-trash" onclick="deleteTodoList(${i})"></i>
          </div>
        </li>`;
    length.innerHTML = i + 1;
  }
}
render();
function addTodoList() {
  let local = JSON.parse(localStorage.getItem("project"));
  let getContentTodoList = document.querySelector("#addTodolist");
  if (getContentTodoList.value === "") {
    alert("fill up");
  } else {
    local.push({
      id: 1,
      content: getContentTodoList.value,
      status: false,
    });
  }
  localStorage.setItem("project", JSON.stringify(local));
  render();
}
// delete
function deleteTodoList(i) {
  let block = document.getElementById("confirmTodoList");
  index = i;
  block.style.display = "block";
}

function clickDelete() {
  let local = JSON.parse(localStorage.getItem("project"));
  local.splice(index, 1);
  localStorage.setItem("project", JSON.stringify(local));
  render();
  document.getElementById("confirmTodoList").style.display = "none";
}

function alertCancel() {
  let block = document.getElementById("confirmTodoList");
  block.style.display = "none";
  //   render();
}

// edit
function editTodoList(index) {
  let local = JSON.parse(localStorage.getItem("project"));
  document.querySelector(".edit").innerHTML = `
    <input type="text" value="${local[index].content}" id="editInput">
    <button onclick="edit(${index})" id="clickEditButton">edit</button>`;
}

function edit(i) {
  let content_a = document.getElementById("editInput").value;
  let local = JSON.parse(localStorage.getItem("project"));
  local[i].content = content_a;
  localStorage.setItem("project", JSON.stringify(local));
  render();
  document.querySelector("#editInput").style.display = "none";
  document.querySelector("#clickEditButton").style.display = "none";
}
// done
function done(i) {
  let local = JSON.parse(localStorage.getItem("project"));
  local[i].status = true;
  localStorage.setItem("project", JSON.stringify(local));
  let check = document.querySelectorAll("#done");
  let a = local.filter((item) => {
    return item.status === true;
  });
  console.log(a);
  check[i].classList.toggle("active");
  document.querySelector("#countDone").innerHTML = a.length;
}
