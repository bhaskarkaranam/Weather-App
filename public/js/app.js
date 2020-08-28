console.log('In Javascript file')

fetch('http://localhost:3000/weather?address=!').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#para1')
// msg1.textContent = ''
const msg2 = document.querySelector('#para2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value
    msg1.textContent = 'Loading..'
    msg2.textContent = ''

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            msg1.textContent = data.error
            msg2.textContent = ''
        }
        else { 
            msg1.textContent = data.location
            msg2.textContent = data.forecast
        }
        // console.log(data)
    })
})
})