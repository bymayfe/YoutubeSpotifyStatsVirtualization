const client_id = "aw66v6d7gvp6hs8k";
const client_secret = "wHZUuAduRVAoREpqzWRTsmNb1xpQoLCS";
const grant_type = "client_credentials";

async function getToken() {
  const url = "https://open.tiktokapis.com/v2/oauth/token/";

  const params = new URLSearchParams();
  params.append("client_key", "aw66v6d7gvp6hs8k");
  params.append("client_secret", "wHZUuAduRVAoREpqzWRTsmNb1xpQoLCS");
  params.append("grant_type", "client_credentials");

  const request = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cache-Control": "no-cache",
    },
    body: params.toString(), // URLSearchParams objesini string olarak göndermek için toString() kullanılır
  });

  if (!request.ok) {
    throw new Error(`HTTP error! Status: ${request.status}`);
  }
  const data = await request.json();
  console.log(data);
  console.log(data.access_token);
  return data.access_token;
}

async function getTopVideos() {
  const access_token = await getToken();
  const url =
    "https://open.tiktokapis.com/v2/research/adlib/ad/query/?fields=ad,ad_group";

  const requestBody = {
    filters: {
      ad_published_date_range: {
        min: "20230101",
        max: "20231231",
      },
      country: "TR", // Türkiye kodu
    },
    // search_term: "coffee",
    max_count: 20,
  };

  const request = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  console.log(request);
  const data = await request.json();
  console.log(data);
}

export { getToken, getTopVideos };
