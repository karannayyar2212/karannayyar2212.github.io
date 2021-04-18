const addbtn = document.getElementById('add-btn');
const clrbtn = document.getElementById('clear-btn');
const search = document.getElementById('search-tasks');

const render = () => {
    let list = localStorage.getItem('tasklist');
    if (list !== null) {
        list = JSON.parse(list);
        let string = "";
        list.forEach((element, index) => {
            string += `<tr>
        <th scope="row">${index + 1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td><button class="btn btn-primary btn-sm" onclick="removeitem(${index})">Delete</button></td>
      </tr>`
        });
        document.getElementById('fire-data').innerHTML = string;
    }
    else {
        document.getElementById('fire-data').innerHTML = '';
    }
}

search.addEventListener('input',()=>{
    let inputval=search.value;
    inputval=inputval.toUpperCase();
    const trows = document.getElementsByTagName('tr');
    Array.from(trows).forEach((row)=>{
        let titleForEachRow = row.getElementsByTagName("td")[0];
        if(titleForEachRow)
        {
            let title=titleForEachRow.innerText;
            title=title.toUpperCase();
            if(title.includes(inputval))
            {
                row.style.display='';
            }
            else
            {
                row.style.display='none';
            }
        }
    });
});


addbtn.addEventListener("click", () => {
    let tit = document.getElementById('title-input').value;
    let desc = document.getElementById('description-input').value;
    if (tit === '' || desc === '') {
        const el = document.getElementById('fire-alert');
        el.innerHTML = `<div class="alert alert-danger" role="alert">
        Please fill both the fields !!!
      </div>`;
        setTimeout(() => {
            el.innerHTML = '';
        }, 3000);
    }
    else if (localStorage.getItem('tasklist') === null) {
        let list = [];
        list.push([tit, desc]);
        localStorage.setItem('tasklist', JSON.stringify(list));
        document.getElementById('title-input').value = '';
        document.getElementById('description-input').value = '';
    }
    else {
        let list = localStorage.getItem('tasklist');
        list = JSON.parse(list);
        list.push([tit, desc]);
        localStorage.setItem('tasklist', JSON.stringify(list));
        document.getElementById('title-input').value = '';
        document.getElementById('description-input').value = '';
    }
    render();
});


clrbtn.addEventListener('click', () => {
    let flag = confirm('Do you really want to clear the list ?');
    if (flag) {
        localStorage.clear();
        document.getElementById('title-input').value = '';
        document.getElementById('description-input').value = '';
        render();
    }
});


let removeitem = (item) => {
    let list = localStorage.getItem('tasklist');
    list = JSON.parse(list);
    list.splice(item, 1);
    localStorage.setItem('tasklist', JSON.stringify(list));
    render();
}

// **********************************     Main Reference   ********************************************************
render();