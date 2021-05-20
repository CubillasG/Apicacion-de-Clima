const API_KEY = '0ca755b855fc9ad2e94140e9195a3260'

const fetchData = position =>{

    const  {latitude,longitude} = position.coords
    fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => setWeatherData(data))

}

const setWeatherData = data =>{
    console.log(data)
    const miData ={
        locacion: data.name,
        descripcion: data.weather[0].main,
        humedad: data.main.humidity,
        temperatura: data.main.temp,
        date: getDate(),
    }
    Object.keys(miData).forEach(key =>{
        document.getElementById(key).textContent = miData[key]
    })
    cleanUp()
}
const cleanUp = ()=>{
    let container = document.getElementById('container')
    let loader = document.getElementById('loader')
    loader.style.display = 'none'
    container.style.display = 'flex'
}
const getDate = ()=>{
    let date = new Date;
    return`${date.getDate()}-${('0' + (date.getMonth() +1)).slice(-2)}-${date.getUTCFullYear()}`
}

const onLoad = ()=>{
    navigator.geolocation.getCurrentPosition(fetchData)
}