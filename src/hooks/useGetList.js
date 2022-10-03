import { useState } from "react";
import { useEffect } from "react";

function useGetList(firstOption, secondOption) {
  const [data, setData] = useState({});

  useEffect(() => {
    const requestExch = `https://api.exchangerate.host/convert?from=${firstOption}&to=${secondOption}`;

    let requestURL = secondOption
      ? requestExch
      : `https://api.exchangerate.host/latest?base=${firstOption}`;
    fetch(requestURL)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, [firstOption, secondOption]);

  return data ? data : null;
}

export default useGetList;
