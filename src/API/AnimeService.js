import axios from "axios";

export default class AnimeService {
  static async getAll() {
    return await axios.get('https://api.jikan.moe/v4/anime');
  }

  static async getById(id) {
    return await axios.get(`https://api.jikan.moe/v4/anime/${id}/full`);
  }

  static async getCharactersById(id) {
    return await axios.get(`https://api.jikan.moe/v4/anime/${id}/characters`)
  }
}