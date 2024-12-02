import ReactDOM from "react-dom/client"
import "./styles/index.css"
import App from "./App"
import "aos/dist/aos.css"
import { BrowserRouter } from 'react-router-dom'
import { DataContextProvider } from "./context/DataContext"

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root container missing in index.html");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <DataContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </DataContextProvider>
);

