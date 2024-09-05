import { confirm, input, select } from '@inquirer/prompts';
import { Args, Command, Flags } from '@oclif/core';
import { execa } from 'execa-cjs';
import { createSpinner } from 'nanospinner';
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import * as path from 'node:path';

import { TemplateInfo } from '../libs/TemplateInfo.js';

class CreateSoldevApp extends Command {
  static override args = {
    directory: Args.string({ default: '.', description: 'directory to create the project in', required: false }),
    name: Args.string({ description: 'Name of the project', required: false }),
  };

  static description = 'Create a new Telkomsel Codebase project with Soldev CLI';

  static override flags = {
    framework: Flags.string({ char: 'f', description: 'Framework to use'}),
    interactive: Flags.boolean({ char: 'i', default: false, description: "interactive mode" }),
    npm: Flags.boolean({ char: 'p', description: 'Install dependencies' }),
    version: Flags.string({ char: 'v', description: 'Version of the template' }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(CreateSoldevApp);

    let projectName: string;
    let frameworkChoice: string;
    let runPackageInstallation: boolean;

    const templatePath = path.join('./', 'templates');
    const availableFrameworks = this.getTemplates(templatePath);

    if (flags.interactive) {
      projectName = args.name || await this.getProjectName();
      frameworkChoice = flags.framework || await this.selectFramework(availableFrameworks);
      runPackageInstallation = flags.npm || await this.confirmPackageInstallation();
    } else {
      if (!args.name) {
        this.error('Project name is required in non-interactive mode.');
      }

      if (!(flags.framework )) {
        this.error('Framework is required in non-interactive mode. Use --framework or -f flag.');
      }

      projectName = args.name;
      frameworkChoice = flags.framework;
      runPackageInstallation = flags.npm ?? false;
    }

    const projectPath = path.join(process.cwd(), projectName);
    const selectedTemplate = availableFrameworks.find(t => t.id === frameworkChoice);

    if (!selectedTemplate) {
      this.error('Selected template not found.');
    }

    try {
      await this.createProject(selectedTemplate, projectPath);
      await this.updatePackageJson(projectPath, projectName);

      if (runPackageInstallation) {
        await this.installPackages(projectPath);
      }

      this.displayFinalInstructions(projectName, runPackageInstallation);
    } catch (error) {
      this.error(`Failed to create the project: ${error}`);
    }
  }

  private async confirmGitInit(): Promise<boolean> {
    return confirm({
      default: true,
      message: 'Do you want to initialize a Git repository?',
    });
  }

  private async confirmPackageInstallation(): Promise<boolean> {
    return confirm({
      default: true,
      message: 'Do you want to run package installation?',
    });
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

  private async copyTemplate(sourcePath: string, destPath: string): Promise<void> {
    const spinner = createSpinner('Copying template files...').start();
    try {
      this.copyDirectory(sourcePath, destPath);
      spinner.success({ text: 'Template files copied successfully' });
    } catch (error) {
      spinner.error({ text: `Failed to copy template files: ${error}` });
      throw error;
    }
  }

  private async createProject(template: TemplateInfo, projectPath: string): Promise<void> {
    const templatePath = path.join('./templates', template.source!)
    await this.copyTemplate(templatePath, projectPath);
  }

  private displayFinalInstructions(projectName: string, packagesInstalled: boolean): void {
    this.log('Done! 🎉');
    this.log('To get started, run:');
    this.log(`  cd ${projectName}`);
    if (!packagesInstalled) {
      this.log('  npm install');
    }

    this.log('  npm run dev');
  }

  private async getProjectName(): Promise<string> {
    return input({
      message: 'What is the name of your project?',
      validate: (value: string) => value.trim() !== '' || 'Project name cannot be empty',
    });
  }

  private getTemplates(templatePath: string): TemplateInfo[] {
    const templates: TemplateInfo[] = [];
    const folders = readdirSync(templatePath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const folder of folders) {
      const templateJsonPath = path.join(templatePath, folder, 'template.json');
      if (existsSync(templateJsonPath)) {
        try {
          const templateInfo: TemplateInfo = JSON.parse(readFileSync(templateJsonPath, 'utf8'));
          templates.push(templateInfo);
        } catch (error) {
          this.warn(`Error reading template.json for ${folder}: ${error}`);
        }
      }
    }

    return templates;
  }

  // private async initializeGit(projectPath: string): Promise<void> {
  //   const spinner = createSpinner('Initializing Git repository...').start();
  //   try {
  //     await execa('git', ['init'], { cwd: projectPath });
  //     await execa('git', ['add', '.'], { cwd: projectPath });
  //     await execa('git', ['commit', '-m', 'Initial commit'], { cwd: projectPath });

  //     spinner.success({ text: 'Git repository initialized successfully\nTo begin push, add remote repository' });
  //   } catch (error) {
  //     spinner.error({ text: `Failed to initialize Git repository: ${error}` });
  //     throw error;
  //   }
  // }

  private async installPackages(projectPath: string): Promise<void> {
    const spinner = createSpinner('Installing packages...').start();
    try {
      await execa('npm', ['install'], { cwd: projectPath });
      spinner.success({ text: 'Packages installed successfully' });
    } catch (error) {
      spinner.error({ text: `Failed to install packages: ${error}` });
      throw error;
    }
  }

  private async selectFramework(availableFrameworks: TemplateInfo[]): Promise<string> {
    return select({
      choices: availableFrameworks.map(framework => ({
        disabled: framework.disabled,
        name: `${framework.name} (${framework.version})`,
        value: framework.id
      })),
      message: 'What framework do you want to use?',
    });
  }

  private async updatePackageJson(projectPath: string, projectName: string): Promise<void> {
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
  }
}

export default CreateSoldevApp