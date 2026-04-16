import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

// saveTokens(accessToken, refreshToken):
export async function saveTokens(accessToken, refreshToken) {
  try {
    await SecureStore.setItemAsync(ACCESS_TOKEN, accessToken);
    await SecureStore.setItemAsync(REFRESH_TOKEN, refreshToken);
  } catch (e) {
    console.error("Storage Error - Save:", e);
  }
}

// getAccessToken() / getRefreshToken():
export async function getAccessToken() {
  try {
    return await SecureStore.getItemAsync(ACCESS_TOKEN);
  } catch (e) {
    console.log(JSON.stringify(e));
  }
}
export async function getRefreshToken() {
  try {
    return await SecureStore.getItemAsync(REFRESH_TOKEN);
  } catch (e) {
    console.log(JSON.stringify(e));
  }
}

// clearTokens():
export async function clearTokens() {
  try {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN);
  } catch (e) {
    console.log(JSON.stringify(e));
  }
}
