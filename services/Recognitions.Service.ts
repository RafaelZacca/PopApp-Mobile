import { apiPost } from "../supports/helpers/ApiConnection.Helper";
import SongModel from "../models/Song.Model";
import RecognitionModel from "../models/Recognition.Model";

export default function sendMusicAndRecognizeSong(recognition: RecognitionModel, abortSignal: AbortSignal): Promise<SongModel> {
    return apiPost<SongModel>('/recognitions', recognition, abortSignal);
}