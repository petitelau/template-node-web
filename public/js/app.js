// console.log('Client side javascript is loaded');

// -- define global var --
// -- elements --
const main = document.querySelector('.main-content')
const btn = document.querySelector('.btn-websocket')

const HomeView = ()  => {

    const wsProgress = new WebSocket('ws://localhost:3501');
    let wsId = -1;

    wsProgress.addEventListener('message', function (event) {
        const data = JSON.parse(event.data);
        console.log('WebSocket.onmessage : ' + JSON.stringify(data));
        if (data.type === 'id') {
            wsId = data.id;
            console.log(wsId);
        } else if (data.type === 'message') {
            console.log(data.value)
            const newP = document.createElement("P");
            newP.textContent = data.value
            main.appendChild(newP);
        }
    });

    const fetchFn = (callback) => {
        fetch('http://localhost:3500/home?wsId=' +wsId)
            .then(response=> response.json().then(data=>
                callback(data) ));
    }

    const updateHtml = (data)=>{
        const newP = document.createElement("P");
        newP.textContent = data.service
        main.appendChild(newP);
    }

    btn.onclick = ()=> {
        console.log("click")
        fetchFn(updateHtml)
    }

}

HomeView();
