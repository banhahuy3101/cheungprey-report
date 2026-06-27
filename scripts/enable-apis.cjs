const {GoogleAuth} = require("google-auth-library");
const https = require("https");

const auth = new GoogleAuth({
  keyFilename:
    "/Users/banhahuy/.config/firebase/banha_fake_gmail.com_application_default_credentials.json",
  scopes: ["https://www.googleapis.com/auth/cloud-platform"],
});

const PROJECT = "cpp-report-cpd-system";
const SERVICES = [
  "cloudfunctions.googleapis.com",
  "cloudrun.googleapis.com",
  "firebaseapphosting.googleapis.com",
  "compute.googleapis.com",
];

async function enableService(accessToken, service) {
  return new Promise((resolve, reject) => {
    const url = `https://serviceusage.googleapis.com/v1/projects/${PROJECT}/services/${service}:enable`;
    const req = https.request(
      url,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          console.log(`${service}: ${res.statusCode} ${data.slice(0, 300)}`);
          resolve();
        });
      }
    );
    req.on("error", reject);
    req.end();
  });
}

async function main() {
  const client = await auth.getClient();
  const token = await client.getAccessToken();
  console.log("Got access token");

  for (const svc of SERVICES) {
    try {
      await enableService(token.token, svc);
    } catch (e) {
      console.error(`${svc}: FAILED - ${e.message}`);
    }
  }

  console.log("Done");
}

main().catch(console.error);
