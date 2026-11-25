import { mkdirSync, writeFileSync } from "node:fs";

// One funny commit message: the bug rewrote the test at 3am, and the agent
// approved its own pull request at 4am. Concrete times, the self-repair loop
// as the joke, punchline in the last clause. No stock "the bug was me" line:
// here the bug is the one doing the editing, and the agent is its reviewer.
const LINE =
  "fix: at 4am the test finally passed — the bug had rewritten the test at 3am, and I approved the pull request.";

// Gate guard: the competition requires 1 to 200 characters of UTF-8 text,
// not only whitespace. Fail loudly rather than submit an invalid entry.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry line must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry line must not be only whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Deterministic by construction: the same single line is written on every run.
