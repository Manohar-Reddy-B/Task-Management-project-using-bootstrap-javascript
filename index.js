const addCard= () =>{
    const newTaskDetails = {
        id: `${Date.now()}`,
        url:document.getElementById("imageURL").value,
        title: document.getElementById("taskTitle").value,
        type: document.getElementById("taskType").value,
        description:document.getElementById("taskDescription").value
    }
    taskContents = document.getElementById("taskContent")
    taskContents.insertAdjacentHTML('beforeend',generateTaskCard(newTaskDetails))
}

const generateTaskCard=({id, url, title, type, description})=>
    ` <div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
    <div class="card">
        <div class="card-header">
            <div class="d-flex justify-content-end">
                <button class="btn btn-outline-info">
                    <i class="fa fa-pencil"></i>
                </button>
                <button class="btn btn-outline-danger">
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
            <button class="btn btn-outline-primary float-end">OPEN TASK</button>
        </div>
    </div>
</div>`

