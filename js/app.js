const elContent = document.getElementById('form');
const elPage = document.getElementById('page');
const elAllDelButton = document.querySelector('.all');

let data = JSON.parse(localStorage.getItem("data")) || [];
data.forEach(element => {
    elPage.innerHTML += ulCard(element)
});

function ulCard({ inputName, id }) {
    return `
        <ul>
            <li>${inputName}</li>
            <span id="${id}">delete</span>
        </ul>   
    `
}

elContent.addEventListener('submit', function (e) {
    e.preventDefault();
    const inputName = e.target['text'].value;
    const res = {
        inputName,
        id: Date.now(),
    }

    data.push(res);
    localStorage.setItem('data', JSON.stringify(data))
    e.target.reset()
    elPage.innerHTML += ulCard(res)
})

document.addEventListener('click', function (e) {
    if (e.target.textContent === 'delete') {
        const targetId = e.target.getAttribute('id');
        data = data.filter((element) => element.id.toString() !== targetId);
        elPage.innerHTML = '';
        localStorage.setItem('data', JSON.stringify(data));
        data.forEach((element) => {
            elPage.innerHTML += ulCard(element)
        })
    }
})

elAllDelButton.addEventListener('click', function () {
    let data = JSON.parse(localStorage.getItem('data')) || [];
    
    data = [];
    localStorage.setItem('data', JSON.stringify(data));
    
    elPage.innerHTML = '';
});
