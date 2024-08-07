import { confirm, input, select } from '@inquirer/prompts';
import { Command } from '@oclif/core';
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import * as path from 'node:path';

interface TemplateInfo {
  author: string;
  disabled: boolean;
  name: string;
  stacks: string[];
  value: string;
  version: string;
}

interface FrameworkChoice {
  disabled?: boolean;
  name: string;
  value: string;
}

class CreateSoldevApp extends Command {
  static description = 'Create a new Soldev app interactively';

  static examples = [
    `$ <%= config.bin %>
? What is the name of your project? my-new-app
? What framework do you want to use? Next.js 14
? Do you want to use TypeScript? Yes
? Do you want to run package installation? Yes
Creating a new Soldev app in ./my-new-app
`,
  ];

  async run(): Promise<void> {
    const projectName = await input({
      message: 'What is the name of your project?',
      validate: (value: string) => value.trim() !== '' || 'Project name cannot be empty',
    });

    const templatePath = path.join(path.dirname(__dirname), 'templates');
    const availableFrameworks = this.getTemplates(templatePath);

    if (availableFrameworks.length === 0) {
      this.error('No templates found. Please check your templates directory.');
    }

    const frameworkChoice = await select({
      choices: availableFrameworks,
      message: 'What framework do you want to use?',
    });

    const useTypeScript = await confirm({
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
    let selectedTemplatePath = path.join(templatePath, frameworkChoice);

    // Check if JavaScript version is requested and available
    if (!useTypeScript) {
      const jsTemplatePath = `${selectedTemplatePath}-js`;
      if (existsSync(jsTemplatePath)) {
        selectedTemplatePath = jsTemplatePath;
      } else {
        this.warn('JavaScript template not found. Using TypeScript template.');
      }
    }

    if (!existsSync(selectedTemplatePath)) {
      this.error(`Template not found: ${selectedTemplatePath}`);
    }

    try {
      // Copy template files
      this.copyDirectory(selectedTemplatePath, projectPath);
      this.log(`Created a new Soldev app in ${projectPath}`);

      // Update package.json
      const packageJsonPath = path.join(projectPath, 'package.json');
      if (existsSync(packageJsonPath)) {
        try {
          const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
          packageJson.name = projectName;
          writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        } catch (error) {
          this.error(`Failed to update package.json: ${error}`);
        }
      }

      if (runPackageInstallation) {
        this.log('Installing packages...');
        try {
          const { execa } = await import('execa');
          await execa('npm', ['install'], { cwd: projectPath });
          this.log('Packages installed successfully');
        } catch (error) {
          this.error(`Failed to install packages: ${error}`);
        }
      } else {
        this.log('Package installation skipped');
      }

      if (initializeGit) {
        this.log('Initializing Git repository...');
        try {
          const { execa } = await import('execa');
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

      this.log('  npm run dev');
    } catch (error) {
      this.error(`Failed to create the project: ${error}`);
    }
  }

  private copyDirectory(src: string, dest: string) {
    mkdirSync(dest, { recursive: true });
    const entries = readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        this.copyDirectory(srcPath, destPath);
      } else {
        copyFileSync(srcPath, destPath);
      }
    }
  }

  private getTemplates(templatePath: string): FrameworkChoice[] {
    const templates: FrameworkChoice[] = [];
    const folders = readdirSync(templatePath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const folder of folders) {
      if (folder.endsWith('-js')) continue; // Skip JS folders, they'll be handled with their TS counterparts

      const templateJsonPath = path.join(templatePath, folder, 'template.json');
      if (existsSync(templateJsonPath)) {
        try {
          const templateInfo: TemplateInfo = JSON.parse(readFileSync(templateJsonPath, 'utf8'));
          templates.push({
            disabled: templateInfo.disabled,
            name: `${templateInfo.name} (${templateInfo.version})`,
            value: folder
          });
        } catch (error) {
          this.warn(`Error reading template.json for ${folder}: ${error}`);
        }
      }
    }

    return templates;
  }
}

export = CreateSoldevApp;