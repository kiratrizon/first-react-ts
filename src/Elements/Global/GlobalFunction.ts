import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export { MySwal };

interface FetchDataParams {
  method: string;
  endpoint: string;
  data?: {};
  query?: {};
  headers?: {};
}

export default async function fetchData({
  method,
  endpoint,
  data,
  query,
  headers = {},
}: FetchDataParams): Promise<[any, any]> {
  const baseUrl = import.meta.env.VITE_API_DOMAIN || "https://yourapi.com";

  const queryString = query
    ? "?" + new URLSearchParams(query as Record<string, string>).toString()
    : "";

  const url: string = baseUrl + endpoint + queryString;
  try {
    // Make the API request using axios
    const response = await axios({
      method,
      url,
      headers,
      data,
    });
    return [null, response.data];
  } catch (error: any) {
    const errorMessage = error.response ? error.response.data : error.message;
    return [errorMessage, null];
  }
}
