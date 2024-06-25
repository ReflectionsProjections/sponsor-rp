
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Page } from "./components/Page";
import { Home } from "./routes/Home";
import { ResumeBook } from "./routes/ResumeBook";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Page showNav={false} pageContent={<Home />} />} />
        <Route path="/resume-book" element={<Page showNav={false} pageContent={<ResumeBook />} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
