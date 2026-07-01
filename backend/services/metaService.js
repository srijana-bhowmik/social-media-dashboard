import axios from "axios";

const IG_API_BASE = "https://graph.facebook.com/v19.0";

/**
 * Get Instagram profile stats
 */
export const getInstagramProfile = async (igId, accessToken) => {
  const url = `${IG_API_BASE}/${igId}?fields=username,followers_count,media_count&access_token=${accessToken}`;

  const res = await axios.get(url);
  return res.data;
};

/**
 * Get Instagram posts
 */
export const getInstagramMedia = async (igId, accessToken) => {
  const url = `${IG_API_BASE}/${igId}/media?fields=id,caption,media_url,like_count,comments_count&access_token=${accessToken}`;

  const res = await axios.get(url);
  return res.data;
};