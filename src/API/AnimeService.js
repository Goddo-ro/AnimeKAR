import axios from "axios";

export default class AnimeService {
  static async getAll() {
    return await axios.get('https://api.jikan.moe/v4/anime');
  }

  static async getById(id) {
    return await axios.get(`https://api.jikan.moe/v4/anime/${id}/full`);
  }

  static async getCharactersByAnimeId(id) {
    return await axios.get(`https://api.jikan.moe/v4/anime/${id}/characters`)
  }

  static async getStaffByAnimeId(id) {
    return await axios.get(`https://api.jikan.moe/v4/anime/${id}/staff`);
  }

  static async getThemesByAnimeId(id) {
    return await axios.get(`https://api.jikan.moe/v4/anime/${id}/themes`);
  }

  static async getReviewsByAnimeId(id) {
    return await axios.get(`https://api.jikan.moe/v4/anime/${id}/reviews`);
  }
}