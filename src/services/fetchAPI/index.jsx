const postAPI = async (
  URL,
  body,
  method = "POST",
  headers = { "Content-Type": "application/json" }
) => {
  try {
    if (!process.env.NEXT_PUBLIC_API_URL || !URL) {
      throw new Error("URL bulunamadı!");
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL + URL}`, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
      cache: "no-store",
    });
    return await response.json();
  } catch (err) {
    console.error(`API request failed: ${err}`);
    throw new Error(`API request failed: ${err}`);
  }
};

const getAPI = async (
  URL,
  headers = { "Content-Type": "application/json" }
) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL + URL}`, {
      method: "GET",
      headers: headers,
      cache: "no-store",
    });
    return await response.json();
  } catch (err) {
    console.error(`API request failed: ${err}`);
    throw new Error(`API request failed: ${err}`);
  }
};

const deleteAPI = async (
  URL,
  headers = { "Content-Type": "application/json" }
) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL + URL}`, {
      method: "DELETE",
      headers: headers,
      cache: "no-store",
    });

    if (response.status === 204 || response.status === 200) {
      return { status: "success" };
    } else {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.error(`API request failed: ${err}`);
    throw new Error(`API request failed: ${err}`);
  }
};

const putAPI = async (
  URL,
  body,
  headers = { "Content-Type": "application/json" }
) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL + URL}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(body),
      cache: "no-store",
    });
    return await response.json();
  } catch (err) {
    console.error(`API request failed: ${err}`);
    throw new Error(`API request failed: ${err}`);
  }
};

export { postAPI, getAPI, deleteAPI, putAPI };
