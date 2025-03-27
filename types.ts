import SongModel from "./models/Song.Model";

export type RootStackParamList = {
    HomePage: undefined;
    SongPage: SongModel;
    RecommendationsModal: { recognition: SongModel; animation: any };
    LoadingModal: undefined;
  };
  