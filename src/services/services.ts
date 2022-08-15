const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

const headers = new Headers();
headers.append("Content-Type", "application/json");

export async function fetchJson(url: any, options: any, onCancel?: any) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }
    const payload = await response.json();
    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if ((error as any).name !== "AbortError") {
      console.error((error as any).stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

export async function getPlayerContext() {
  const url = `${API_BASE_URL}/api/player-context`;
  const options = {
    method: "GET",
    headers,
  };
  return await fetchJson(url, options);
}

export async function getGames(playerId: number) {
  const url = `${API_BASE_URL} /api/player/${playerId}/games`;
  const options = {
    method: "GET",
    headers,
  };
  return fetchJson(url, options);
}

export async function getPlayerCharacter(playerId: number) {
  const url = `${API_BASE_URL}/api/player/${playerId}/characters`;
  const options = {
    method: "GET",
    headers,
  };
  return fetchJson(url, options);
}

export async function getCharactersClasses(playerLevel) {
  const url = new URL(`${API_BASE_URL}/api/characters-classes`);
  url.searchParams.append("player_level", playerLevel);
  const options = {
    method: "GET",
    headers,
  };
  return fetchJson(url, options);
}

export async function createCharacter(playerId, selectedCharachterClass) {
  const url = `${API_BASE_URL}/api/player/${playerId}/characters`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: selectedCharachterClass }),
  };
  return await fetchJson(url, options);
}

export async function updateCharacter(playerId, characterId, body) {
  const url = `${API_BASE_URL}/api/player/${playerId}/characters/${characterId}`;
  const options = {
    method: "PUT",
    headers,
    body,
  };
  return await fetchJson(url, options);
}
