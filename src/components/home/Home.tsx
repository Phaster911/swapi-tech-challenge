import { useCallback, useState } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import MainContent from "../main-content/MainContent";
import useDebounce from "../../hooks/use-debounce.hook";
import useGetPersons from "../../react-query/queries/use-get-people.hook";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const resetCurrentPage = useCallback(() => setCurrentPage(1), []);

  const debouncedSearch = useDebounce(searchTerm, undefined, resetCurrentPage);

  const { data, isPending, isSuccess, isError, refetch } = useGetPersons(
    debouncedSearch,
    currentPage
  );

  const pageCount = data?.pageCount || 0;
  const people = data?.people || [];

  const shouldShowData = isSuccess && pageCount > 0;

  const handleOnChangeSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleOnChangePage = (nextPage: number) => {
    setCurrentPage(nextPage);
  };

  const handleOnClickTryAgain = () => {
    refetch();
  };

  return (
    <>
      <Header
        isPending={isPending}
        searchTerm={searchTerm}
        handleOnChangeSearch={handleOnChangeSearch}
      />
      <MainContent
        shouldShowData={shouldShowData}
        people={people}
        currentPage={currentPage}
        pageCount={pageCount}
        handleOnChangePage={handleOnChangePage}
        isPending={isPending}
        isSuccess={isSuccess}
        isError={isError}
        tryAgainHandler={handleOnClickTryAgain}
      />
      <Footer />
    </>
  );
}
