let baseUrl, username, password, mode;
baseUrl = import.meta.env.VITE_BASE_URL;
username = import.meta.env.VITE_USERNAME;
password = import.meta.env.VITE_PASSWORD;
mode = import.meta.env.VITE_MODE;
const pull = async (endPoint) => {
  const result = await fetch(baseUrl + endPoint, {
    headers: {
      Authorization: !username ? "" : "Basic " + btoa(`${username}:${password}`)
    }
  });
  const json = await result.json();
  return json;
  // if (result.redirected === true && result.url.includes("/security/login.action")) {
  //   if (mode === "production") {
  //     const text = `
  //     - Login session has been expired because of inactivity, please log in again.
  //     - Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.
  //     `;
  //     alert(text);
  //     window.location.reload();
  //   } else {
  //     const json = await result.json();
  //     return json;
  //   }
  // } else {
  //   const json = await result.json();
  //   return json;
  // }
};

const push = async (endPoint, payload, method) => {
  const result = await fetch(baseUrl + endPoint, {
    method: method ? method : "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization: !username ? "" : "Basic " + btoa(`${username}:${password}`)
    }
  });
  // if (result.redirected === true && result.url.includes("/security/login.action")) {
  //   if (mode === "production") {
  //     const text = `
  //     - Login session has been expired because of inactivity, please log in again.
  //     - Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.
  //     `;
  //     alert(text);
  //     window.location.reload();
  //   } else {
  //     const json = await result.json();
  //     return json;
  //   }
  // } else {
  //   return result;
  // }
  return result;
  // const json = await result.json();
  // return json;
};

const purePush = (url, payload, method) => {
  return fetch(url, {
    method: method ? method : "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export { pull, push, purePush };
