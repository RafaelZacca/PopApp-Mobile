import ImageModel from "./Image.Model";

export default class SongModel {
    id: number;
    name: string;
    artistName: string;
    image?: ImageModel;
    recommendedSongs?: Array<SongModel>;
}