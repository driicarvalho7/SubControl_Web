<br />
<div align="center">
  <a>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">SSC0961 - Desenvolvimento Web e Mobile</h3>

  <p align="center">
    Este é um projeto para a matéria de Desenvolvimento Web e Mobile, o intuito desse aplicativo é ser um hub para o  gerenciamento de assinaturas recorrentes que você usuário possui, como Netflix, Spotify, Prime Video e etc... Espero que goste! 😊
  </p>
</div>
<br /><br />

# Expo APP + Node JS + MongoDB

This is an project that uses [Expo](https://expo.dev) to de client mobile app, [NodeJS]() for the APIs that comunicate with de client and [MongoDB]() for the database comunication. This is an exemple of the architecture of the Project:

<div align="center">
  <img src="https://github.com/driicarvalho7/SubControl_Web/blob/main/sub_control_architecturepng.png" alt="Arquitetura do Sistema">
</div>

## Get started

1. Install dependencies in the client and API's components

   ```bash
   cd ./sub_control_client
   npm install
   cd ./sub_control_api
   npm install
   cd ./sub_control_api_signatures
   npm install
   ```

2. Start the client app

   ```bash
   cd ./sub_control_client
   npx expo start
   ```
   In the output, you'll find options to open the app in a

  - [development build](https://docs.expo.dev/develop/development-builds/introduction/)
  - [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
  - [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
  - [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

3. Configure the .env file to the MongoDB string connection:

   ```
   MONGODB_URI=mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]
   ```

5. Start the API's components

   ```bash
   cd ./sub_control_api
   npm start
   cd ./sub_control_api_signatures
   npm start
   ```

## Git Flow

```mermaid
gitGraph
   commit id: "Initial Commit" tag: "main"
   branch development
   commit id: "Setup Project" tag: "development"
   
   # Adicionando as novas branches logo após a development
   branch tests
   commit id: "Add Initial Tests" tag: "tests"
   checkout development
   merge tests tag: "Merge Initial Tests"
   
   branch bug_fix
   commit id: "Fix Initial Bug" tag: "bug_fix"
   checkout development
   merge bug_fix tag: "Merge Bug Fix"
   
   branch updates
   commit id: "Update Initial Code" tag: "updates"
   checkout development
   merge updates tag: "Merge Updates"

   branch feature_telas_iniciais
   commit id: "Implement Initial Screens" tag: "feature_telas_iniciais"
   checkout development
   merge feature_telas_iniciais tag: "Merge Initial Screens"
   
   branch feature_api_login
   commit id: "Implement API Login" tag: "feature_api_login"
   checkout development
   merge feature_api_login tag: "Merge API Login"
   
   branch feature_api_signatures
   commit id: "Implement API Signatures" tag: "feature_api_signatures"
   checkout development
   merge feature_api_signatures tag: "Merge API Signatures"
   
   branch feature_jwt_auth
   commit id: "Implement JWT Auth" tag: "feature_jwt_auth"
   checkout development
   merge feature_jwt_auth tag: "Merge JWT Auth"

   # Adicionando a branch feature_calendar
   branch feature_calendar
   commit id: "Implement Calendar Feature" tag: "feature_calendar"
   checkout development
   merge feature_calendar tag: "Merge Calendar Feature"
   
   checkout main
   merge development tag: "Release"

```

## Pipeline CI/CD

```mermaid
graph TD;
    A[Code Commit on 'main' branch] --> B(Build);
    B --> C(Test);
    C --> D(Code Quality Analysis with SonarCloud);
    D --> E(Deploy on Docker to Azure);
```
