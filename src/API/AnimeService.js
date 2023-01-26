import axios from "axios";

export default class AnimeService {
  static async getAll() {
    return await axios.get('https://api.jikan.moe/v4/anime');
  }
}