require('dotenv').config();

const axios = require('axios');

class Service {
  getCatFacts = async () => {
    let result;
    try {
      const resp = await axios({ method: 'get', url: process.env.CAT_FACTS_API });
      if (resp) {
        result = {
          data: { quote: resp.data.fact, source: process.env.CAT_FACTS_API },
          status: 200,
        };
      }
    } catch (err) {
      console.error(err);
    }

    return result;
  };

  getChuckNorrisJokes = async () => {
    let result;
    try {
      const resp = await axios({ method: 'get', url: process.env.CHUCK_NORRIS_JOKES_API });
      if (resp) {
        result = {
          data: { quote: resp.data.value, source: resp.data.url },
          status: 200,
        };
      }
    } catch (err) {
      console.error(err);
    }
    return result;
  };

  getQuote = () => {
    const sources = [this.getCatFacts, this.getChuckNorrisJokes];
    const url = sources[Math.floor(Math.random() * sources.length)];
    return url();
  };
}

module.exports = Service;