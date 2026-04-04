import { useEffect } from "react";

export default function Dashboard() {
  useEffect(() => {
    document.title = "EBL — Fast Track Salesforce | Dashboard Executivo";
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", margin: 0, padding: 0 }}>
      <iframe
        src="/dashboard-data.html"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          display: "block",
        }}
        title="EBL Dashboard Executivo"
      />
    </div>
  );
}
