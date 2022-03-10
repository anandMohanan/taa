import Cookies from "js-cookie";
import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
  ssrExchange,
} from "urql";

const isServerSide = typeof window === "undefined";
const ssrCache = ssrExchange({ isClient: !isServerSide });

const client = createClient({
  // url: "https://blooming-gorge-19416.herokuapp.com/",
  url: "https://theaesthetesarena.azurewebsites.net/",
  exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
  fetchOptions: () => {
    const token = Cookies.get("jwtToken");
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : "kjdahsj",
      },
    };
  },
});

export { client, ssrCache };
