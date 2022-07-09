const button = document.querySelector("button")

button.addEventListener("click", () => {
    if(navigator.geolocation) {
        button.innerText = "Allow to detect location"
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    } else {
        button.innerText = "Your browser is not supported"
    }
})

function onSuccess(position) {
    button.innerText = "Finding you..."
    let {latitude, longitude} = position.coords
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=f8dd98e834954225ac81a793dc4ff3b5`)
    .then(response => response.json()).then(result => {
        console.log(result)
        let AllDetails = result.results[0].components
        let {county, country, continent} = AllDetails
        button.innerText = `${county}, ${country}, ${continent}`
        console.table(AllDetails)
    }).catch(() => {
        button.innerText = "Couldn't find you at this moment"
    })
}

function onError(error) {
    if(error.code == 1) {
        button.innerText = "You denied the request"
    }
    else if(error.code == 2) {
        button.innerText = "Location isn't available"
    }
    else {
        button.innerText = "Something went wrong"
    }
    button.setAttribute("disabled", "true")
}