import axios from "axios";

export class UserQueries {
  static baseUrl = "https://honestly-grateful-honeybee.ngrok-free.app/auth/";

  static async login(username: string, password: string) {
    const response = await axios.post(this.baseUrl + "login", {
      username,
      password,
    });
    return response.data;
  }
  static async signup(username: string, password: string) {
    const response = await axios.post(this.baseUrl + "signup", {
      username,
      password,
    });
    return response.data;
  }
  static async logout() {
    console.log("Not implemented yet");
  }
}
