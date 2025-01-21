import "./App.css";
import { Container, Stack, Typography, useTheme } from "@mui/material";
import { JavaScriptLogo } from "./JavaScriptLogo";
import { GitHubIcon } from "./GitHubLogo";
import { Start } from "./Start";
import { useQuestionsStore } from "./store/questions";
import { Game } from "./Game";
import { useQuestionsData } from "./hooks/useQuestionsData";
import { Results } from "./Results";
import useMediaQuery from "@mui/material/useMediaQuery";

function App() {
  const questions = useQuestionsStore((state) => state.questions);

  const { unanswered } = useQuestionsData();
  const theme = useTheme();

  const medium = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <main>
      <Container maxWidth="sm">
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          justifyContent="center"
        >
          <JavaScriptLogo />
          <Typography variant={medium ? "h2" : "h5"} component="h1">
            JavaScript Quiz
          </Typography>
        </Stack>
        {questions.length === 0 && <Start />}
        {questions.length > 0 && unanswered > 0 && <Game />}
        {questions.length > 0 && unanswered === 0 && <Results />}

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
      </Container>
    </main>
  );
}

export default App;
