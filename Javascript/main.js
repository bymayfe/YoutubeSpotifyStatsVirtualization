import { GetPlaylist } from "./spotify.js";
import { saveJSON } from "./savejson.js";
import { getMostPopularVideosFromYear, displayVideos } from "./youtube.js";
// import { getTWData } from "./twitch.js";

import data from "./JSON/spotify2020.json" assert { type: "json" };

async function main() {
  const { playlistInfo, playlist } = await GetPlaylist("YEARBYSPOTIFYPLAYLIST");
  // 2020 yılın şarkıları: https://open.spotify.com/playlist/2znNvGyQxAUmp6cdX4uM1o
  // 2021 yılın şarkıları: https://open.spotify.com/playlist/3etNjGlQTQRurDDVhM68J8
  // 2022 yılın şarkıları: https://open.spotify.com/playlist/1e7u35nUdO3GxSAc4tBGu2
  // 2023 yılın şarkıları: https://open.spotify.com/playlist/37i9dQZF1DWTNZTmARWKQa
  console.log(playlistInfo);
  saveJSON(playlistInfo, "spotify2021.json");

  const data = await getMostPopularVideosFromYear(2020);
  console.log(data);
  saveJSON(data, "youtube2020.json");
}
main();
