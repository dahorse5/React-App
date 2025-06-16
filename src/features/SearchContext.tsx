import { createContext, useContext, useState } from "react";

const SearchContext = createContext({
search: "",
setSearch: (s: string) => {},
});

export const useSearch = () => useContext(SearchContext);

import { PropsWithChildren } from "react";

export const SearchProvider = ({ children }: PropsWithChildren<{}>) => {
const [search, setSearch] = useState("");
return (
<SearchContext.Provider value={{ search, setSearch }}>
    {children}
</SearchContext.Provider>
);
};
