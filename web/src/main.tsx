import React from "react";
import ReactDOM from "react-dom/client";

const App = () => {
    console.log('OK');
    return <>Hello Word</>
}

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);