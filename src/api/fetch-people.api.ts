const BASE_URL = "https://swapi.dev/api/people/";

export type ApiPerson = {
  name: string;
  gender: string;
  birth_year: string;
  mass: string;
  height: string;
  films: string[];
  url: string;
};

type ApiResponse = {
  count: number;
  results: ApiPerson[];
};

export default async function fetchPeopleApi(
  searchTerm: string,
  currentPage: number
) {
  const requestUrl = new URL(BASE_URL);

  if (searchTerm) {
    requestUrl.searchParams.set("search", searchTerm);
  }

  requestUrl.searchParams.set("page", currentPage.toString());

  const finalUrl = requestUrl.toString();

  const response = await fetch(finalUrl);

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  return (await response.json()) as ApiResponse;
}
