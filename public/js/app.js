console.log('Client side javascript');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const errorMessage = document.querySelector('#errorMessage');
const successMessage = document.querySelector('#successMessage');

//errorMessage.textContent = "From javascript Error!!"

weatherForm.addEventListener('submit' ,(e)=>{
    e.preventDefault();

    const location = search.value;

    errorMessage.textContent= "Loading...";
    successMessage.textContent ='';


    fetch('http://localhost:3000/weather?address='+location).then((response)  =>{
    //console.log("Printing response ", response)
    response.json().then((data) =>{
        if(data.error){
            //console.log(data.error)
            errorMessage.textContent = data.error;
        }
        else{
            //console.log(data);
            errorMessage.textContent = data.Location;
            successMessage.textContent = data.forecast;
            //console.log(data.forecast);
        }
        
    })
});

})