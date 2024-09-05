import { useQuery } from "@tanstack/react-query";
import fetchPeopleApi from "../../api/fetch-people.api";
import getIdFromUrl from "../../utils/get-id-from-url.util";

export type Person = {
  id: string;
  name: string;
  gender: string;
  birthYear: string;
  mass: string;
  filmsEntered: number;
  height: string;
};

export default function useGetPeople(searchTerm: string, currentPage: number) {
  const { isPending, isSuccess, isError, data, refetch } = useQuery({
    queryKey: ["people", searchTerm, currentPage],
    queryFn: () => fetchPeopleApi(searchTerm, currentPage),
    select: (data) => ({
      pageCount: Math.ceil(data.count / 10),
      people: data.results.map(
        ({ name, gender, birth_year, height, mass, films, url }) =>
          ({
            id: getIdFromUrl(url),
            name,
            gender,
            birthYear: birth_year,
            mass,
            height,
            filmsEntered: films.length,
          } as Person)
      ),
    }),
  });

  return { isPending, isSuccess, isError, data, refetch };
}
