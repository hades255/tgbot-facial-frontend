import React, { useCallback, useState } from "react";
import ConvertForm from "../components/convert/ConvertForm";
import Convertistory from "../components/convert/Convertistory";

const Convert = () => {
  const [refresh, setRefresh] = useState(true);

  const handleRefreshHistory = useCallback((param) => {
    setRefresh(param);
  }, []);

  return (
    <div className="px-4 py-8 flex flex-col gap-4">
      <ConvertForm refreshHistory={handleRefreshHistory} />
      <div className="border p-8 rounded-lg">
        <Convertistory
          refresh={refresh}
          refreshHistory={handleRefreshHistory}
        />
      </div>
    </div>
  );
};

export default Convert;
