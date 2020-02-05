import { RemoteConnection } from "../data-connections/Remote.Connection";
import { SimulatedConnection } from "../data-connections/Simulated.Connection";
import { SongModel } from "../models/Song.Model";

// const connection = new RemoteConnection();
const connection = new SimulatedConnection();

export async function getSong(base64: string): Promise<SongModel> {
    return await connection.getSong(base64);
}

// fetch('https://mywebsite.com/endpoint/', {
//   method: 'POST',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     firstParam: 'yourValue',
//     secondParam: 'yourOtherValue',
//   }),
// });