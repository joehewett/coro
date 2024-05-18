import "./index.css";
import React from "react";
// import "@radix-ui/themes/styles.css";

function App() {
  return (
    <div
      className={`flex flex-col bg-background font-mono text-foreground my-16`}
    >
      <h1 className="text-4xl font-bold text-center p-4 mt-6 bg-primary text-dark">
        Coro Benavent
      </h1>
      <div className="flex-grow flex-shrink overflow-hidden p-4 md:px-16 md:py-6 lg:px-32">
        <img src="/hh.jpeg" alt="Coro Benavent" className="" />
      </div>
    </div>
  );
}

export default App;
