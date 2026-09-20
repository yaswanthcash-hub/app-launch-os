# Expected Behavior: empty

## Project Type
Empty directory containing no `package.json`, `app.json`, `android/`, or `ios/`.

## Expected Result
- The CLI project guard must refuse to audit this directory.
- Exit code must be non-zero (1).
- An error message must clearly indicate that no mobile app (Expo or React Native) was detected and instruct the user to specify `--dir <path>`.
- No numeric score should be computed or displayed.
