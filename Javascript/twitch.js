async function getOAuthToken(clientId, clientSecret) {
  const response = await fetch(`https://id.twitch.tv/oauth2/token`, {
    method: "POST",
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "client_credentials",
    }),
  });
  const data = await response.json();
  return data.access_token;
}

async function getStreams(
  oauthToken,
  clientId,
  startDate,
  endDate,
  cursor = ""
) {
  let url = `https://api.twitch.tv/helix/streams?first=50&language=tr`;
  if (cursor) {
    url += `&after=${cursor}`;
  }

  const response = await fetch(url, {
    headers: {
      "Client-ID": clientId,
      Authorization: `Bearer ${oauthToken}`,
    },
  });
  const data = await response.json();
  return data;
}

async function getAllStreams(oauthToken, clientId, startDate, endDate) {
  let allStreams = [];
  let cursor = "";
  let hasMore = true;

  while (hasMore) {
    const data = await getStreams(
      oauthToken,
      clientId,
      startDate,
      endDate,
      cursor
    );
    console.log(data);
    allStreams = allStreams.concat(data.data);

    cursor = data.pagination.cursor;
    hasMore = !!cursor;
  }

  return allStreams;
}

function getYearDateRange(year) {
  const startDate = new Date(year, 0, 1).toISOString();
  const endDate = new Date(year, 11, 31, 23, 59, 59).toISOString();
  return { startDate, endDate };
}

async function main(year) {
  const clientId = "31fa6c13njarqe9m0odilieni2i0rq";
  const clientSecret = "lz4anu2bfn2wjwekc6a0xpy9gsqxqn";

  //   const year = 2023;

  const { startDate, endDate } = getYearDateRange(year);

  try {
    const oauthToken = await getOAuthToken(clientId, clientSecret);
    const streams = await getAllStreams(
      oauthToken,
      clientId,
      startDate,
      endDate
    );

    const streamID = streams.map((x) => x.id);
    const userID = streams.map((x) => x.user_id);
    const userName = streams.map((x) => x.user_login);
    const gameName = streams.map((x) => x.game_name);
    const type = streams.map((x) => x.type);
    const title = streams.map((x) => x.title);
    const viewerCount = streams.map((x) => x.viewer_count);
    const startedAt = streams.map((x) => x.started_at);
    const language = streams.map((x) => x.language);
    const isMature = streams.map((x) => x.is_mature);
    const tags = streams.map((x) => x.tags);

    console.log(tags);

    const jsonForm = {
      streamID: streamID,
      userID: userID,
      userName: userName,
      gameName: gameName,
      type: type,
      title: title,
      viewerCount: viewerCount,
      startedAt: startedAt,
      language: language,
      isMature: isMature,
      tags: tags,
    };
    return jsonForm;

    // const streams = await getStreams(oauthToken, clientId, startDate, endDate);

    // Yayın verilerini yıllık olarak filtrele ve konsola yazdır
    // console.log(`${year} yılına ait yayınlar:`, streams);

    // const streamID = streams.data.map((x) => x.id);
    // const userID = streams.data.map((x) => x.user_id);
    // const userName = streams.data.map((x) => x.user_login);
    // const gameName = streams.data.map((x) => x.game_name);
    // const type = streams.data.map((x) => x.type);
    // const title = streams.data.map((x) => x.title);
    // const viewerCount = streams.data.map((x) => x.viewer_count);
    // const startedAt = streams.data.map((x) => x.started_at);
    // const language = streams.data.map((x) => x.language);
    // const isMature = streams.data.map((x) => x.is_mature);
    // const tags = streams.data.map((x) => x.tags);

    // console.log(tags);

    // const jsonForm = {
    //   streamID: streamID,
    //   userID: userID,
    //   userName: userName,
    //   gameName: gameName,
    //   type: type,
    //   title: title,
    //   viewerCount: viewerCount,
    //   startedAt: startedAt,
    //   language: language,
    //   isMature: isMature,
    //   tags: tags,
    // };

    // return jsonForm;
  } catch (error) {
    console.error("Bir hata oluştu:", error);
  }
}

// main();

export { main as getTWData };
