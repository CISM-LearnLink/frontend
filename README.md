# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## SonarCloud (SonarQube Cloud) setup

To enable SonarCloud analysis for this repository, follow these steps:

- **Add a SonarCloud project**: create a new project on https://sonarcloud.io and link it to your GitHub repository.
- **Repository secrets**: add the following GitHub repository secrets under Settings → Secrets:
	- `SONAR_ORGANIZATION` — your SonarCloud organization key
	- `SONAR_TOKEN` — a SonarCloud token with analysis permissions

- **Files added**:
	- [sonar-project.properties](sonar-project.properties) — basic SonarCloud project properties
	- [.github/workflows/sonarcloud.yml](.github/workflows/sonarcloud.yml) — GitHub Actions workflow to run SonarCloud on push and PRs

- **Notes**:
	- Replace `YOUR_SONARCLOUD_ORG_KEY` in `sonar-project.properties` with your actual organization key, or rely on workflow secrets.
	- The workflow uses `npm ci` and `npm run build` before running the scanner; adjust commands if your build differs.

