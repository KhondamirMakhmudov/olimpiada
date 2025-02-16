import { useState, useEffect } from "react";

export default function TestPage() {
  const [testStarted, setTestStarted] = useState(false);

  // Тестни бошлаш
  const startTest = () => {
    setTestStarted(true);
    alert("Тест бошланди! Бошқа саҳифаларга ўтиш мумкин эмас.");
  };

  // Тестни тугатиш
  const endTest = () => {
    setTestStarted(false);
    alert("Тест тугатилди. Энди бошқа саҳифаларга ўтиш мумкин.");
  };

  // Бошқа саҳифаларга ўтишни блоглаш
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (testStarted) {
        event.preventDefault();
        event.returnValue = ""; // Огохлантириш хабарни чикариш
      }
    };

    const handlePopState = (event) => {
      if (testStarted) {
        alert(
          "Тест давом этаётганлиги сабабли, бошқа саҳифаларга ўтиш мумкин эмас!"
        );
        window.history.pushState(null, "", window.location.pathname); // URL ни ўзгартирмаслик
      }
    };

    // Браузернинг бошқа саҳифаларга ўтишини чеклаш
    window.addEventListener("beforeunload", handleBeforeUnload);
    // Браузернинг орқага/олдинга тугмасини босилганини чеклаш
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [testStarted]);

  return (
    <div>
      <h1>Тест</h1>
      <button onClick={startTest}>Тестни бошлаш</button>
      <button onClick={endTest}>Тестни тугатиш</button>
    </div>
  );
}
