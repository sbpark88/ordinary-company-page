const ViewUrl = {
  root: "/",
  department: "/department",
  community: "/community",
  gallery: "/gallery",
  youtube: "/youtube",
  contact: "/contact",
  members: "/members",
};

const OpenApiURL = {
  youtubePlaylist: " https://www.googleapis.com/youtube/v3/playlistItems",
};

const MembersURL = {
  get: "/DB/members.json",
};

const objToUrlParams = (object) => {
  return Object.entries(object)
    .filter(([key, value]) => validParams(value))
    .reduce((acc, [key, value]) => {
      acc.append(key, value);
      return acc;
    }, new URLSearchParams())
    .toString();

  function validParams(value) {
    if ("number" === typeof value) return !isNaN(value);
    else if (value === undefined || value === null || value instanceof Object)
      return false;
    else return String(value).trim().length > 0;
  }
};

export { ViewUrl, OpenApiURL, MembersURL, objToUrlParams };
