let baseUrl, username, password;
baseUrl = import.meta.env.VITE_BASE_URL;
username = import.meta.env.VITE_USERNAME;
password = import.meta.env.VITE_PASSWORD;

const pushFileResource = (base64, fileName) => {
  let form = new FormData();
  form.append("file", Buffer.from(base64.split(",")[1], "base64"), fileName);
  return fetch(baseUrl + "/api/fileResources", {
    method: "POST",
    credentials: "include",
    body: form,
    headers: {
      "Content-Type": `multipart/form-data; boundary=${form.getBoundary()}`,
      Authorization: !username ? "" : "Basic " + btoa(`${username}:${password}`)
    }
  })
    .then((result) => {
      return result.json();
    })
    .catch((err) => {
      return err;
    });
};

export { pushFileResource };
