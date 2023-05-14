export const api = {
        base: 'https://api.aladhan.com/v1/calendarByCity/',
        latLon: 'https://api.weatherapi.com/v1/forecast.json',
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate() - 1
    }

