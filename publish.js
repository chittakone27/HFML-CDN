require("dotenv/config");
const fetch = require("node-fetch");
const btoa = require("btoa");
const fs = require("fs");
const FormData = require("form-data");
const { VITE_BASE_URL, VITE_USERNAME, VITE_PASSWORD } = process.env;
const path = "./dist/icv2.zip";
const form = new FormData();
const fileStream = fs.createReadStream(path);
form.append("file", fileStream);

(async () => {
  const result = await fetch(`${VITE_BASE_URL}/api/apps`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(VITE_USERNAME + ":" + VITE_PASSWORD)}`
    },
    body: form
  });
  console.log(JSON.stringify(result));
})();
