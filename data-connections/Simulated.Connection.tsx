import { IConnection } from "../interfaces/IConnections";
import { SongModel } from "../models/Song.Model";

const simulatedConnectionTimer = 3000;

export class SimulatedConnection implements IConnection {

    async getSong(base64: string): Promise<SongModel> {
        if (base64) {
            await new Promise(res => setTimeout(res, simulatedConnectionTimer));
            return Object.assign(new SongModel(), { id: "12as3", name: "Cat" });
        }
        else {
            throw new Error("Something failed")
        }
    }
}