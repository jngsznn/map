import Realm from "realm";
// Returns the shared instance of the Realm app.
let APP_ID = "mit-building-map-csgtm";
export function getRealmApp() {
  const appId = APP_ID; // Set Realm app ID here.
  const appConfig = {
    id: appId,
    timeout: 10000,
  };
  return new Realm.App(appConfig);
}
