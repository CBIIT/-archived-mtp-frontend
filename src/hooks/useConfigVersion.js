import { useEffect, useState } from "react";
import { version } from "../constants";

function fetchVersionObj(apiURL) {
  return fetch(apiURL).then(res => res.json());
}

export default function useConfigVersion() {
  const [data, setData] = useState([]);
  const versionURL = version.versionConfigURL;
  useEffect(()=>{
    const fetchData = async () => {
      let result = [];
      try {
        result = await fetchVersionObj(versionURL);
      } catch (error) {
        result = [];
      }
      setData(result);
    };
    fetchData();
  },[data.length, versionURL]);

  return data;
}