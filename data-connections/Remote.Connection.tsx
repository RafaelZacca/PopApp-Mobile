import { IConnection } from "../interfaces/IConnections";
import { SongModel } from "../models/Song.Model";

export class RemoteConnection implements IConnection {

    async getSong(base64: string): Promise<SongModel> {
        try {
            let response = await fetch(
                'https://facebook.github.io/react-native/movies.json',
            );
            let responseJson = await response.json();
            return responseJson.movies;
        } catch (error) {
            console.error(error);
        }
    }

}