import SearchResults from "@/components/search/SearchResults";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchResults />
    </Suspense>
  );
};

export default page;
