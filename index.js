let globalTaskData=[];
taskContents = document.getElementById("taskContent")
modalContents = document.getElementById("openTaskBody")
const addCard= () =>{
    const newTaskDetails = {
        id: `${Date.now()}`,
        url:document.getElementById("imageURL").value,
        title: document.getElementById("taskTitle").value,
        type: document.getElementById("taskType").value,
        description:document.getElementById("taskDescription").value
    }
    taskContents.insertAdjacentHTML('beforeend',generateTaskCard(newTaskDetails))

    globalTaskData.push(newTaskDetails)
    saveToLocalStorage()
}

const generateTaskCard=({id, url, title, type, description})=>
    ` <div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
    <div class="card">
        <div class="card-header">
            <div class="d-flex justify-content-end">
                <button class="btn btn-outline-info" onclick="editTask(this)" name=${id}>
                    <i class="fa fa-pencil"></i>
                </button>
                <button class="btn btn-outline-danger" onclick="deleteTask(this)" name=${id}>
                    <i class="fa fa-trash"></i>
                </button>
            </div>
        </div>
        <img class="card-img-top"src=${url} alt="Task img">
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${description}</p>
            <span class="badge bg-primary">${type}</span>
        </div>
        <div class="card-footer">
            <button class="btn btn-outline-primary float-end" data-bs-toggle="modal" data-bs-target="#openTask" onclick="openModal(this)" name=${id}>OPEN TASK</button>
        </div>
    </div>
</div>`

const saveToLocalStorage = ()=> {
    localStorage.setItem("tasky",JSON.stringify({tasks: globalTaskData}))
}

const reloadTaskcard = ()=> {
    const localStorageCopy = JSON.parse(localStorage.getItem("tasky"))
    if(localStorageCopy){
        globalTaskData=localStorageCopy.tasks
    }
    globalTaskData.map((carddata)=>{
        taskContents.insertAdjacentHTML('beforeend',generateTaskCard(carddata))
    })
}

const deleteTask = (e)=>{
    const targetId = e.getAttribute("name")
    const removedTask = globalTaskData.filter((cardData)=> cardData.id!==targetId)
    globalTaskData = removedTask
    saveToLocalStorage()
    window.location.reload()
}

const editTask = (e)=>{
    // const targetId = e.getAttribute("name")
    // console.log(e)
    // console.log(e.parentNode)
    // console.log(e.parentNode.parentNode)
    // console.log(e.parentNode.parentNode.parentNode)
    // console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1])
    // console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3])
    // console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5])
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable","true")
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable","true")
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable","true")

    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1]
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML = "SAVE CHANGES"
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].removeAttribute("data-bs-toggle");
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].removeAttribute("data-bs-target");
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("onclick","saveEditTask(this)")
}

const saveEditTask =(e) =>{
    console.log(e)
    console.log(e.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable","false"))
    console.log(e.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable","false"))
    console.log(e.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable","false"))
    e.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML = "OPEN TASK"
    e.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("onclick","openModal(this)")
    e.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("data-bs-toggle","modal");
    e.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("data-bs-target","#openTask");

    // e.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("onclick","openModal(this)")

    // e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable","true")
    // e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable","true")
    // e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable","true")
}

const openModal =(e)=>{
    const targetId = e.getAttribute("name")
    const getTask = globalTaskData.filter((e) => e.id===targetId)
    modalContents.innerHTML =openModalDispaly(getTask[0])
}

const openModalDispaly=({id, url, title, type, description})=>{
const date = new Date(parseInt(id));
console.log(date)
return `
<img class="card-img-top mb-3 rounded-lg"src=${url} alt="Task img" height="200px" width="100%">
<strong class="text-sm text-muted">Created on ${date.toDateString()}</strong>
 <h3 class="card-title">${title}</h5>
 <p class="card-text">${description}</p>
 <span class="badge bg-primary">${type}</span>`
}