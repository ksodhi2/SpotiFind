export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "https://spotifindapp.uc.r.appspot.com/play";
const clientId = "da6c6b98cf2d47ffa86a6a045caf3d31";

const scopes = ["streaming", "user-read-email", "user-read-private", 
        "user-read-playback-state", "user-modify-playback-state", 
        "user-library-read", "user-library-modify"];

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;