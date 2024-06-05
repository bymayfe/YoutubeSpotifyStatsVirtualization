// Spotify API playlist info request and convert json to csv

(await import("dotenv")).config();

const client_id = process.env.SPOTIFY_CLIENT_ID; // Your client id
const client_secret = process.env.SPOTIFY_CLIENT_SECRET; // Your secret
const auth_token = Buffer.from(
  `${client_id}:${client_secret}`,
  "utf-8"
).toString("base64");

async function GetPlaylist(id) {
  const playlist = await BaseRequest(`playlists/${id}`, "GET", null);
  const songName = playlist.tracks.items.map((track) => track.track.name);
  const songID = playlist.tracks.items.map((track) => track.track.id);
  const artistName = playlist.tracks.items.map((track) =>
    track.track.artists.map((artist) => artist.name).join(", ")
  );
  const songExplicit = playlist.tracks.items.map(
    (track) => track.track.explicit
  );
  const songPopularity = playlist.tracks.items.map(
    (track) => track.track.popularity
  );
  const songDuration = playlist.tracks.items.map(
    (track) => track.track.duration_ms
  );
  const songAvailableMarkets = playlist.tracks.items.map(
    (track) => track.track.available_markets
  );
  const artistGenre = await Promise.all(
    playlist.tracks.items.map(async (track) => {
      const id = track.track.id;
      const trackx = await getTrack(id);
      console.log(trackx);
      return trackx.artists.genre;
    })
  );
  const songOrder = playlist.tracks.items.map((track, index) => index + 1);
  console.log(artistGenre);
  const playlistInfo = {
    name: playlist.name,
    description: playlist.description,
    owner: playlist.owner.display_name,
    followers: playlist.followers.total,
    total_tracks: playlist.tracks.total,
    songName: songName,
    songID: songID,
    artistName: artistName,
    artistGenre: artistGenre,
    songOrder: songOrder,
    songAvailableMarkets: songAvailableMarkets,
    songExplicit: songExplicit,
    songPopularity: songPopularity,
    songDuration: songDuration,
  };
  return { playlistInfo, playlist };
}

async function getTrack(id) {
  if (!id) return false;
  const data = await BaseRequest(`tracks/${id}`, "GET");
  // console.log("ddx", data);
  return data;
}

const getAuth = async () => {
  try {
    // console.log("auth_token", auth_token);
    // console.log("client_id", client_id);
    // console.log("client_secret", client_secret);
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth_token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });
    const data = await response.json();
    // console.log("v1", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Spotify API base request
async function BaseRequest(endpoint, methods, bodies) {
  try {
    const token = await getAuth();
    const response = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
      method: methods,
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        "Content-Type": "application/json",
      },
      body: bodies ? JSON.stringify(bodies) : null,
    });
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export { GetPlaylist };
