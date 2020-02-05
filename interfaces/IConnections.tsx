import { SongModel } from "../models/Song.Model";

export interface IConnection {
    getSong(base64: string): Promise<SongModel>;
}