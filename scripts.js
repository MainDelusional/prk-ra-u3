let used_ids = [];
let saveable = [];
const max_items = 100;

function create_item(content) {
  const div = document.getElementById("to-do-list");
  let task = document.createElement("p");
  let free_id = find_free_id();
  task.textContent = content;
  task.id = "button_" + free_id;

  task.style.padding = "5px";
  task.style.background = "#E78284";
  task.style.borderRadius = "5px";
  task.style.margin = "5px";

  task.setAttribute("onclick","fade_out(" + free_id + ")");
  task.setAttribute("onmouseover","highlight(" + free_id + ")");
  task.setAttribute("onmouseout","unhighlight(" + free_id + ")");
  div.appendChild(task);
}

function new_item() {
  const div = document.getElementById("to-do-list");
  let task = document.createElement("p");
  let free_id = find_free_id();
  task.textContent = document.getElementById("item").value;
  task.id = "button_" + free_id;

  task.style.padding = "5px";
  task.style.background = "#E78284";
  task.style.borderRadius = "5px";
  task.style.margin = "5px";

  task.setAttribute("onclick","fade_out(" + free_id + ")");
  task.setAttribute("onmouseover","highlight(" + free_id + ")");
  task.setAttribute("onmouseout","unhighlight(" + free_id + ")");
  div.appendChild(task);
  save_on_local();
}

function find_free_id() {
  for (let id = 0; id  < max_items; id++) {
    if (used_ids.includes(id)) {
      continue;
    } else {
      used_ids.push(id);
      return id;
    }
  }

}

function highlight(id) {
  document.getElementById("button_" + id).style.background = "#888";
}

function unhighlight(id) {
  document.getElementById("button_" + id).style.background = "#E78284";
}

function remove(id) {
  let to_be_removed = document.getElementById("button_" + id);
  let index = used_ids.indexOf(id);

  document.getElementById("to-do-list").removeChild(to_be_removed);

  if (index > -1) { // only splice array when item is found
    used_ids.splice(index, 1); // 2nd parameter means remove one item only
  }
  save_on_local();
}

function fade_out(id) {
  let interval_id = null;
  let opacity = 100;
  clearInterval(interval_id);
  interval_id = setInterval(frame, 1);
  function frame() {
    if (opacity < 10) {
      clearInterval(interval_id);
      remove(id);
    } else {
      opacity--;
      document.getElementById("button_" + id).style.opacity = "" + opacity + "%"
    }
  }
} 

function save_on_local() {
  saveable = [];
  used_ids.forEach(prep_for_save);
  localStorage.removeItem("todos");
  localStorage.setItem("todos", JSON.stringify(saveable));
}

function prep_for_save(id) {
  saveable.push(document.getElementById("button_" + id).innerHTML);
}

function init() {
  let data = JSON.parse(localStorage.getItem("todos"));
  if (data == null) {
    return;
  }
  data.forEach(create_item);
}

init();

