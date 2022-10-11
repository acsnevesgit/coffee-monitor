<h1>Coffee Monitor ☕</h1>

<h2>Description</h2>

This web app can be used to help monitor, analyze and manage the operations performance of a coffee machine. At the core it shows the current workload as a percentage bar. Additionally, it can display information about issues that could be affecting the workload, recommendations to potentially fix the issues and charts for analyzing performance and capacity history.

The API used by the app is part of this repository and can be run locally.

<h2>What HAS and WILL be done?</h2>

- [x] The percentage bar represents the current workload of the coffee machine and updates the value every two seconds.
- [x] Whenever the coffee machine workload exceeds the critical level of 80%, the site gives a warning to the user.
- [x] Information about critical infrastructure should be available to everyone! The page follows accessibility standards and guidelines.
- [ ] Provide the user with meaningful messages that can be used to better manage the use of the coffee machine and solve issues.
- [ ] Provide the user with control over the layout (filter, order, sort, etc.) of the information to be displayed.

<h2>Quickstart</h2>

- Run `docker compose up` to build and run the test environment.
- Go to `localhost:8080` in your browser to see the site.