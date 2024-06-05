import Twit from "twit";
import { TwitterApi } from "twitter-api-v2";

async function getTweets(year) {
  //   const T = new Twit({
  //     consumer_key: "OWwcRswKHq8D8dW9eQROE8tlK",
  //     consumer_secret: "ueM3zHm9gSz17NZ0WGxTAopT2Oy4QSqlJlFQuMIQAO0J56hMkl",
  //     access_token: "1373897901240373248-1rZuEPjjYqv8HUOhvqP8f6GWG0b6tI",
  //     access_token_secret: "jQMvEtq1dG68Tl3RNsqzum5OUfpPl4yYp1hIAcSCU81SD",
  //     timeout_ms: 60 * 1000,
  //   });
  //   const request = await T.get("search/tweets", {
  //     q: `filter:nativeretweets until:${year}-12-31 since:${year}-01-01`,
  //     count: 50,
  //     result_type: "popular",
  //   });
  //   console.log(request.data);
  //   const client = new TwitterApi({
  //     appKey: "OWwcRswKHq8D8dW9eQROE8tlK",
  //     appSecret: "ueM3zHm9gSz17NZ0WGxTAopT2Oy4QSqlJlFQuMIQAO0J56hMkl",
  //     accessToken: "1373897901240373248-1rZuEPjjYqv8HUOhvqP8f6GWG0b6tI",
  //     accessSecret: "jQMvEtq1dG68Tl3RNsqzum5OUfpPl4yYp1hIAcSCU81SD",
  //   });
  //   const roClient = client.readOnly;
  //   const tweets = await roClient.v2.search(
  //     `filter:nativeretweets place_country:TR until:${year}-12-31 since:${year}-01-01`,
  //     {
  //       max_results: 50,
  //       "tweet.fields": "public_metrics",
  //     }
  //   );
  //   console.log(tweets.data);
  //   const twitterClient = new TwitterApi(
  //     "AAAAAAAAAAAAAAAAAAAAANiytwEAAAAAgY5F6qvv2BcKUO742kqaT0gMAN8%3DgZFbI9PN8l81kRTd94ReDsQOszovZoee7xo1gX2SuW0zqMuPaU"
  //   );
  //   // Tell typescript it's a readonly app
  //   const readOnlyClient = twitterClient.readOnly;
  //   const tweets = await readOnlyClient.v2.search(
  //     `filter:nativeretweets place_country:TR until:${year}-12-31 since:${year}-01-01`,
  //     {
  //       max_results: 50,
  //       "tweet.fields": "public_metrics",
  //     }
  //   );
  //   console.log(tweets);

  //   const BEARER_TOKEN =
  //     "AAAAAAAAAAAAAAAAAAAAANiytwEAAAAAgY5F6qvv2BcKUO742kqaT0gMAN8%3DgZFbI9PN8l81kRTd94ReDsQOszovZoee7xo1gX2SuW0zqMuPaU";
  //   const endpointUrl = "https://api.twitter.com/2/tweets/search/all";

  //   const startTime = `${year}-01-01T00:00:00Z`;
  //   const endTime = `${year}-12-31T23:59:59Z`;

  //   const response = await fetch(
  //     `${endpointUrl}?query=place_country:TR -is:retweet&tweet.fields=public_metrics&start_time=${startTime}&end_time=${endTime}&max_results=100`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${BEARER_TOKEN}`,
  //       },
  //     }
  //   );

  //   console.log(response);

  //   if (!response.ok) {
  //     throw new Error(`Error fetching tweets: ${response.statusText}`);
  //   }

  //   const data = await response.json();
  //   const tweets = data.data || [];

  //   tweets.sort(
  //     (a, b) => b.public_metrics.retweet_count - a.public_metrics.retweet_count
  //   );

  //   const top50Tweets = tweets.slice(0, 50);

  //   console.log(`Top 50 Tweets for the year ${year}:`);
  //   console.log(top50Tweets);

  // Yıllar arasında döngü yaparak her yıl için en çok retweet edilen tweet'leri al
  // const years = [2020, 2021, 2022, 2023];
  // years.forEach(year => {
  //   getTweetsByYear(year);
  // });

  try {
    const response = await fetch(
      "https://api.twitter.com/2/tweets/search/recent?query=from:twitterdev&max_results=50",
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer AAAAAAAAAAAAAAAAAAAAANiytwEAAAAAgY5F6qvv2BcKUO742kqaT0gMAN8%3DgZFbI9PN8l81kRTd94ReDsQOszovZoee7xo1gX2SuW0zqMuPaU", // Bearer tokeninizi buraya girin
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      const tweets = data.data;
      console.log("Türkiye'de en çok retweet alan tweetler:");
      tweets.forEach((tweet, index) => {
        console.log(`${index + 1}. Tweet: ${tweet.text}`);
        console.log(`   Retweet Sayısı: ${tweet.public_metrics.retweet_count}`);
      });
    } else {
      console.error("API çağrısı başarısız oldu.");
    }
  } catch (error) {
    console.error("Hata oluştu:", error);
  }
}

export { getTweets };

// (err, data, response) => {
//     if (err) {
//       console.error("An error occurred:", err.message);
//       if (err.code) {
//         console.error("Error code:", err.code);
//       }
//     } else {
//       if (data.statuses.length === 0) {
//         console.log(
//           "No tweets found for the specified query and date range."
//         );
//       } else {
//         data.statuses.forEach((tweet, index) => {
//           console.log(
//             `${index + 1}. ${tweet.text} - ${tweet.retweet_count} retweets`
//           );
//           console.log(
//             `By: @${tweet.user.screen_name} on ${tweet.created_at}`
//           );
//         });
//       }
//     }
//   }
