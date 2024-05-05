
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Page } from "./components/Page";
import { Home } from "./routes/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Page showNav={false} pageContent={<Home />} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
