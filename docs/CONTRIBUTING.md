
# Contributing Guidelines

Thank you for being a part of this exciting project! We’re thrilled to have you on board and look forward to working together seamlessly. Please follow the instructions below to ensure a smooth workflow.

## 1. Fork the Repository

1. Go to the main repository page.
2. Click the **Fork** button in the upper right corner.
3. This will create a copy of the repository under your GitHub account.

## 2. Clone the Forked Repository

1. Clone the forked repository to your local machine using the following command:
   ```bash
   git clone https://github.com/dev-mohit06/Filekko.git
   ```

2. Navigate into the cloned repository:
   ```bash
   cd Filekko
   ```

## 3. Create a New Branch

1. Always create a new branch for your contributions. Name the branch something meaningful to the feature or fix you are working on.
   
   Example:
   ```bash
   git checkout -b feature/add-new-feature
   ```

2. Push the branch to your remote fork:
   ```bash
   git push -u origin feature/add-new-feature
   ```

## 4. Make Changes and Commit

1. Make the necessary changes to your codebase.
2. After making changes, stage your files:
   ```bash
   git add .
   ```

3. **Use Conventional Commits** to format your commit messages. Follow the specification at [www.conventionalcommits.org](https://www.conventionalcommits.org/).

   **Examples:**
   - `feat: add new feature for user login`
   - `fix: resolve bug in data validation`
   - `docs: update README with new instructions`
   - `chore: update dependencies`

4. **Validate your commit message** with the predefined format. This project uses a Continuous Integration (CI) workflow to validate that commit messages follow the required format. Every commit message must follow this pattern:
   
   ```
   <type>[optional scope]: <description>
   
   [optional body]
   
   [optional footer(s)] @<username>
   ```

   **Examples:**
   - `feat(api): add user login functionality`
   - `fix(validation): resolve edge case in input validation`
   
   If the commit message does not follow this format, the CI will fail, and you'll need to fix the commit message.

5. Commit your changes:
   ```bash
   git commit -m "type(scope): short description of the change"
   ```

## 5. Push and Create a Pull Request (PR)

1. Push your commits to the branch:
   ```bash
   git push origin feature/add-new-feature
   ```

2. Go to the original repository on GitHub and click on the **Compare & pull request** button.
3. Fill out the PR template and submit your pull request for review.

---

By following these steps and adhering to the [Conventional Commits](https://www.conventionalcommits.org/) specification, you help us maintain a clean and understandable project history. The commit message validation will run on each push and pull request to ensure consistency. Thank you for your contributions!
