import { Container, Typography, Stack } from "@mui/material";
import "./App.css";
import { JavaScriptLogo } from "./JavaScriptLogo";
import { GitHubIcon } from "./GitHubLogo";
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <a
            href="https://github.com/AndresDM37/JavaScript-Quiz"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon />
          </a>
          <style>
            {`
              a:hover {
              transform: scale(1.1);
              }
            `}
          </style>
        </div>

        {questions.length > 0 && <Game />}
      </Container>
    </main>
  );
}

export default App;
