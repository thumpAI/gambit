+++
label = "orchestrated_runner_finalize"
+++

Emit final status JSON with this contract:
- status: done|incomplete|blocked|failed
- doneTokenEmitted: boolean
- validationPassed: boolean
- artifacts: { filesChanged[], logPath, testCommand, testExitCode }
- summary: { changed[], remains[], nextStep }

Hard rule:
Only output `status=done` when validationPassed is true and done token is emitted as an exact standalone line.
