const Service = require('egg').Service;

class WeatherService extends Service {
  async getWeather(city) {
    const result = await this.ctx.curl(`http://wthrcdn.etouch.cn/weather_mini?city=${city}`, {
      dataType: 'json',
    });
    if(!result.data || !(result.data.status === 1000 && result.data.desc === "OK")) return null;
    const data = result.data.data
    let info = data.city + ' ' + data.wendu + '℃' + ' ' + data.ganmao
    return info;
  }
  async find(city) {
    const result = await this.ctx.curl(`http://wthrcdn.etouch.cn/weather_mini?city=${city}`, {
      dataType: 'json',
    });
    if(!result.data || !(result.data.status === 1000 && result.data.desc === "OK")) return null;
    const data = result.data.data;
    const today = data.forecast[0]
    this.app.mysql.insert("weather", {
      date: today.date,
      desc: data.ganmao,
      type: today.type,
      city: data.city,
      create_date: new Date(),
      wendu: data.wendu
    })
    return result.data.data;
  }

  async record() {
    const data = this.app.mysql.query("select * from weather", '');
    return data;
  }
}

module.exports = WeatherService;