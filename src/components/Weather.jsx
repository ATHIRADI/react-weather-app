import { useState, useEffect } from 'react'

export const Weather = () => {
    const key = import.meta.env.VITE_API_KEY
    const [city, setCity] = useState('');
    const [search, setSearch] = useState('delhi');
    const [name, setName] = useState('');
    const [iconID, setIconID] = useState('');
    const [weather, setWeather] = useState('');
    const [temp, setTemp] = useState('');
    const [like, setLike] = useState('');
    const [wind, setWind] = useState('');
    const kelvinToFarenheit = (k) => {
        return (k - 273.15).toFixed(2);
    };
    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${key}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setName(data.name)
                setIconID(data.weather[0].icon)
                setWeather(data.weather[0].main);
                setTemp(data.main.temp);
                setLike(data.main.feels_like);
                setWind(data.wind.speed);
            })
    }, [search])
    const searchWeather = (e) => {
        e.preventDefault()
        setSearch(city)
    }


    return (
        <div className='bg-[#343D4B] h-screen w-full'>
            <div className="container mx-auto flex justify-center items-center flex-col h-full w-full space-y-10">
                <h1 className='text-2xl md:text-6xl font-bold text-white text-center'>React Weather App</h1>
                <form className='space-x-1' onSubmit={searchWeather}>
                    <input className='px-5 py-2 md:w-96 outline-none' type="text" value={city} required autoFocus={true} onChange={(event) => setCity(event.target.value)} />
                    <button className='px-5 py-2 hover:scale-105 transition-all duration-300 bg-white'>Search</button>
                </form>
                <div className='flex flex-col border w-3/4 p-5 rounded-lg'>
                    <div className='w-full grid grid-cols-1 lg:grid-cols-3 h-full text-xl text-white items-center justify-items-center '>
                        <div className='space-y-5 my-5 p-1'>
                            <h1 className='text-4xl font-semibold'>{name}</h1>

                            <h1 className='text-md'>Wind Speed : {wind}</h1>
                        </div>
                        <div className='space-y-5 my-5 p-1'>
                            <h1 className='text-4xl font-semibold'>{kelvinToFarenheit(temp)} °C</h1>
                            <h1 className='text-md'>Feels Like: {kelvinToFarenheit(like)} °C</h1>
                        </div>
                        <div className='space-y-5 my-5 p-1'>
                            <img className='mx-auto' src={"http://openweathermap.org/img/wn/" + iconID + "@2x.png"} />
                            <h1 className='text-md'>Weather : {weather}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}