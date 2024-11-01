import { Container, Typography, Stack } from "@mui/material";
import "./App.css";
import { JavaScriptLogo } from "./JavaScriptLogo";
import { Start } from "./Start";
import { useQuestionStore } from "./store/questions";
import { Game } from "./Game";

function App() {
  const questions = useQuestionStore((state) => state.questions);

  return (
    <main>
      <Container maxWidth="sm">
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h2" component="h1">
            <JavaScriptLogo />
            JavaScript Quiz
          </Typography>
        </Stack>

        {questions.length === 0 && <Start />}

        <h3>Programa hecho con React ⚛️</h3>
        <h3>Por Andrés Marchena</h3>

        {questions.length > 0 && <Game />}
      </Container>
    </main>
  );
}

export default App;
