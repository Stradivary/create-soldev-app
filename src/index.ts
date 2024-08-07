import { confirm, input, select } from '@inquirer/prompts';
import { Command } from '@oclif/core';
import { execa } from 'execa';
import { copySync } from 'fs-extra/esm';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

export default class CreateSoldevApp extends Command {
  static description = 'Create a new Soldev app interactively';

  static examples = [
    `$ <%= config.bin %>
? What is the name of your project? my-new-app
? Do you want to use Next.js? Yes
? Do you want to use TypeScript? Yes
? Do you want to skip package installation? No
Creating a new Soldev app in ./my-new-app
`,
  ];

  async run(): Promise<void> {
    const projectName = await input({
      message: 'What is the name of your project?',
      validate: (value) => value.trim() !== '' || 'Project name cannot be empty',
    });

    const frameworkChoice = await select({

      choices: [{
        name: 'Next.js',
        value: 'nextjs',
      }, {
        disabled: true,
        name: 'Angular',
        value: 'angular',
      }, {
        disabled: true,
        name: 'React Native',
        value: 'react-native',
      }],
      default: 'Next.js',
      message: 'What framework do you want to use?',
    });

    const useTypeScript = await select({
      choices: [
        {
          value: 'TypeScript',
        },
        {
          disabled: true,
          value: 'JavaScript',
        },
      ],
      default: true,
      message: 'Do you want to use TypeScript?',
    });

    const runPackageInstallation = await confirm({
      default: true,
      message: 'Do you want to run package installation?',
    });

    const initializeGit = await confirm({
      default: true,
      message: 'Do you want to initialize a Git repository?',
    });

    const projectPath = path.join(process.cwd(), projectName);
    let templatePath = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'templates');

    templatePath = useTypeScript ? path.join(templatePath, 'ts') : path.join(templatePath, 'js');

    if (frameworkChoice) {
      templatePath = path.join(templatePath, frameworkChoice);
    } else {
      this.error('Only Next.js template is supported at the moment');
    }

    if (!existsSync(templatePath)) {
      mkdirSync(templatePath);
      this.error(`Template not found: ${templatePath}`);
    }

    try {
      copySync(templatePath, projectPath);
      this.log(`Created a new Soldev app in ${projectPath}`);

      const packageJsonPath = path.join(projectPath, 'package.json');

      if (existsSync(packageJsonPath)) {
        try {
          // load package.json
          const packageJson = readFileSync(packageJsonPath, 'utf8');

          const newPackageJson = packageJson.replace(/"name":\s*".*"/,` "name": "${projectName}"`);

          writeFileSync(packageJsonPath, newPackageJson);

        } catch (error) {
          this.error(`Failed to update package.json name: ${error}`);
        }
      }

      if (runPackageInstallation) {
        this.log('Installing packages...');
        try {
          await execa('npm', ['install'], { cwd: projectPath });
          this.log('Packages installed successfully');
        } catch (error) {
          this.error(`Failed to install packages: ${error}`);
        }
      } else {
        this.log('Packages installation skipped');
      }

      if (initializeGit) {
        this.log('Initializing Git repository...');
        try {
          await execa('git', ['init'], { cwd: projectPath });
          this.log('Git repository initialized successfully');
        } catch (error) {
          this.error(`Failed to initialize Git repository: ${error}`);
        }
      }

      this.log('Done! 🎉');
      this.log('To get started, run:');
      this.log(`  cd ${projectName}`);
      if (!runPackageInstallation) {
        this.log('  npm install');
      }

      this.log('  npm run dev');
    } catch (error) {
      this.error(`Failed to create the project: ${error}`);
    }
  }
}