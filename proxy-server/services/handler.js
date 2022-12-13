const axios = require("axios").default;

class HttpHandler {

  static async Post(url,data) {
    try {
        const res = await axios.post(url, data);
        return res.data;
    } catch (error) {
    }
  }
}


module.exports = HttpHandler;
