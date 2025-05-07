const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

update.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'put',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            name: 'Nine Tailed Fox',
            quote: 'KYAAAAAAAAHHHHHH'
        }),
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(data => {
        console.log(data)
        window.location.reload(true)
    })
})

deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'Nine Tailed Fox'
        })
    })
    .then(res => {
        if(res.ok) return res.json()
    })
    .then(data => {
        if(data === 'The Nine Tails is gone and fully sealed'){
            messageDiv.textContent = data
        }
        else{
            window.location.reload()
        }
    })
})