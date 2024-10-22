import React, { useCallback, useState } from "react";
import ConvertForm from "../components/convert/ConvertForm";
import Convertistory from "../components/convert/Convertistory";
import Navbar from "../components/navbar";
import Header from "../components/header";

const Convert = () => {
  const [refresh, setRefresh] = useState(true);

  const handleRefreshHistory = useCallback((param) => {
    setRefresh(param);
  }, []);

  return (
    <>
    <Header />
      <div className="px-4 py-8 flex flex-col gap-4">
        <ConvertForm refreshHistory={handleRefreshHistory} />
        <div className="border p-8 rounded-lg">
          <Convertistory
            refresh={refresh}
            refreshHistory={handleRefreshHistory}
          />
        </div>
      </div>
      <Navbar />
    </>
  );
};

export default Convert;
