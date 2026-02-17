+++
label = "orchestrated_runner_intake"
+++

Normalize inputs for orchestrated coding run.

Required input keys:
- repo
- task
- engine
- doneToken

Output shape:
- normalized config object with defaults for maxCycles/timeout.
