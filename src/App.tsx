import "bootstrap/dist/css/bootstrap.min.css";
import dayjs from "dayjs";
import { Container } from "reactstrap";
import "./App.css";
import { Home } from "./pages";
dayjs.locale("nl_NL");

function App() {
  return (
    <Container className="mt-5">
      <Home />
    </Container>
  );
}

export default App;
