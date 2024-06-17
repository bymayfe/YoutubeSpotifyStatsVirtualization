(await import("dotenv")).config();

async function getMostPopularVideosFromYear(year) {
  try {
    // Arama tarihlerini belirleyin
    const publishedAfter = `${year}-01-01T00:00:00Z`;
    const publishedBefore = `${year}-12-31T23:59:59Z`;

    // Belirli bir tarih aralığındaki videoları arayın
    const searchApiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&publishedAfter=${publishedAfter}&publishedBefore=${publishedBefore}&regionCode=TR&maxResults=50&key=${process.env.YOUTUBE_API_KEY}`;

    let response = await fetch(searchApiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    let data = await response.json();
    let videoIds = data.items.map((item) => item.id.videoId);

    // Video detaylarını alın
    const videosApiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds.join(
      ","
    )}&key=${process.env.YOUTUBE_API_KEY}`;
    response = await fetch(videosApiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    data = await response.json();

    // Videoları izlenme sayılarına göre sırala
    let sortedVideos = data.items.sort((a, b) => {
      return (
        parseInt(b.statistics.viewCount) - parseInt(a.statistics.viewCount)
      );
    });

    // En çok izlenen 50 videoyu al
    let top50Videos = sortedVideos.slice(0, 50);

    // Videoları filtrele ve geri döndür
    const filteredVideos = top50Videos.map((video) => {
      return {
        kind: video.kind,
        etag: video.etag,
        id: video.id,
        publishedAt: video.snippet.publishedAt,
        channelId: video.snippet.channelId,
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnails: video.snippet.thumbnails,
        channelTitle: video.snippet.channelTitle,
        tags: video.snippet.tags,
        categoryId: video.snippet.categoryId,
        liveBroadcastContent: video.snippet.liveBroadcastContent,
        defaultLanguage: video.snippet.defaultLanguage || "none",
        videoDuration: video.contentDetails.duration,
        videoDimension: video.contentDetails.dimension,
        videoDefinition: video.contentDetails.definition,
        videoCaption: video.contentDetails.caption,
        videoLicensedContent: video.contentDetails.licensedContent,
        videoProjection: video.contentDetails.projection,
        viewCount: video.statistics.viewCount,
        likeCount: video.statistics.likeCount,
        dislikeCount: video.statistics.dislikeCount,
        favouriteCount: video.statistics.favoriteCount,
        commentCount: video.statistics.commentCount,
      };
    });

    return filteredVideos;
  } catch (error) {
    console.error("Fetching error:", error);
  }
}

// Videoları ekranda göstermek için fonksiyon
function displayVideos(videos) {
  videos.forEach((video) => {
    console.log(`Başlık: ${video.snippet.title}`);
    console.log(`Görüntülenme Sayısı: ${video.statistics.viewCount}`);
    console.log(`Yayınlanma Tarihi: ${video.snippet.publishedAt}`);
    console.log(`Video ID: ${video.id}`);
    console.log("\n");
  });
}

export { getMostPopularVideosFromYear, displayVideos };
