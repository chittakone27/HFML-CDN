let baseUrl, username, password;
baseUrl = import.meta.env.VITE_BASE_URL;
username = import.meta.env.VITE_USERNAME;
password = import.meta.env.VITE_PASSWORD;
export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const endPoint = "/api/fileResources";
    const result = await fetch(baseUrl + endPoint, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: !username
          ? ""
          : "Basic " + btoa(`${username}:${password}`),
      },
    });
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
