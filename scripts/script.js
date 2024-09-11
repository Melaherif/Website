// script.js
const apiKey = '5107bb26f78990b621d7ba337f7f2069'; // تأكد من أن مفتاح API صحيح وفعال

async function getWeather() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('يرجى إدخال اسم المدينة');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ar`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('حدث خطأ في الاتصال بالخادم');
        }

        const data = await response.json();

        if (data.cod === 200) {
            const weather = `
                <h2>${data.name}</h2>
                <p>الحرارة: ${data.main.temp} °C</p>
                <p>الوصف: ${data.weather[0].description}</p>
                <p>الرطوبة: ${data.main.humidity}%</p>
                <p>الرياح: ${data.wind.speed} م/ث</p>
            `;
            document.getElementById('weather-info').innerHTML = weather;
        } else {
            document.getElementById('weather-info').innerHTML = `<p>لم يتم العثور على المدينة أو حدث خطأ: ${data.message}</p>`;
        }
    } catch (error) {
        console.error('حدث خطأ:', error);
        document.getElementById('weather-info').innerHTML = `<p>حدث خطأ في الاتصال بالخادم: ${error.message}</p>`;
    }
}
