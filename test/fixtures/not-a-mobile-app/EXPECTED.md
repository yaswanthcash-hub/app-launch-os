# Expected Behavior: not-a-mobile-app

## Project Type
Standard Node.js backend API using Express. Does not contain:
- `expo` or `react-native` dependencies
- `app.json` or `app.config.js`
- `android/` or `ios/` native directories

## Expected Result
- The CLI project guard must refuse to audit this project.
- Exit code must be non-zero (1).
- An error message must explain that this is not a recognized mobile project and point to `--dir`.
- No numeric score should be computed.
