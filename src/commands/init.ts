import { confirm, input, select } from '@inquirer/prompts';
import { Args, Command, Flags } from '@oclif/core';
import { execa } from 'execa-cjs';
import { createSpinner } from 'nanospinner';
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import * as path from 'node:path';

interface TemplateInfo {
  id: string;
  author: string;
  disabled: boolean;
  name: string;
  stacks: string[];
  version: string;
  mode: 'copy' | 'degit' | 'script';
  source?: string;
}

class CreateSoldevApp extends Command {
  static override args = {
    directory: Args.string({ default: '.', description: 'directory to create the project in' }),
  };

  static description = 'Create a new Telkomsel Codebase project with Soldev CLI';
  static summary = 'Create a new Telkomsel Codebase project with Soldev CLI';

  static override flags = {
    force: Flags.boolean({ char: 'f' }),
    interactive: Flags.boolean({ char: 'i', description: "interactive mode", default: true }),
    git: Flags.boolean({ char: 'g', description: 'Initialize a git repository' }),
    npm: Flags.boolean({ char: 'p', description: 'Install dependencies' }),
    name: Flags.string({ char: 'n', description: 'Project Name' }),
    framework: Flags.string({ char: 'f', description: 'Framework to use' }),
    version: Flags.string({ char: 'v', description: 'Version of the template' }),
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(CreateSoldevApp);

    let projectName: string;
    let frameworkChoice: string;
    let runPackageInstallation: boolean;
    let initGit: boolean;

    const templatePath = path.join( './', 'templates');
    const availableFrameworks = this.getTemplates(templatePath);

    if (flags.interactive) {
      projectName = await this.getProjectName();
      frameworkChoice = await this.selectFramework(availableFrameworks);
      runPackageInstallation = await this.confirmPackageInstallation();
      initGit = flags.git || await this.confirmGitInit();
    } else {
      if (!flags.name) {
        this.error('Project name is required in non-interactive mode. Use --name or -n flag.');
      }
      if (!flags.framework) {
        this.error('Framework is required in non-interactive mode. Use --framework or -f flag.');
      }
      projectName = flags.name;
      frameworkChoice = flags.framework;
      runPackageInstallation = flags.npm ?? true;
      initGit = flags.git ?? true;
    }

    const projectPath = path.join(process.cwd(), projectName);
    const selectedTemplate = availableFrameworks.find(t => t.id === frameworkChoice);

    if (!selectedTemplate) {
      this.error('Selected template not found.');
    }

    try {
      await this.createProject(selectedTemplate, projectPath, projectName);
      await this.updatePackageJson(projectPath, projectName);

      if (runPackageInstallation) {
        await this.installPackages(projectPath);
      }

      if (initGit) {
        await this.initializeGit(projectPath);
      }

      this.displayFinalInstructions(projectName, runPackageInstallation);
    } catch (error) {
      this.error(`Failed to create the project: ${error}`);
    }
  }


  private async getProjectName(): Promise<string> {
    return input({
      message: 'What is the name of your project?',
      validate: (value: string) => value.trim() !== '' || 'Project name cannot be empty',
    });
  }

  private async selectFramework(availableFrameworks: TemplateInfo[]): Promise<string> {
    return select({
      choices: availableFrameworks.map(framework => ({
        name: `${framework.name} (${framework.version})`,
        value: framework.id,
        disabled: framework.disabled
      })),
      message: 'What framework do you want to use?',
    });
  }

  private async confirmPackageInstallation(): Promise<boolean> {
    return confirm({
      default: true,
      message: 'Do you want to run package installation?',
    });
  }

  private async confirmGitInit(): Promise<boolean> {
    return confirm({
      default: true,
      message: 'Do you want to initialize a Git repository?',
    });
  }

  private async createProject(template: TemplateInfo, projectPath: string, projectName: string): Promise<void> {
    const templatePath = path.join('./templates', template.source!)
    switch (template.mode) {
      case 'copy':
        await this.copyTemplate(templatePath, projectPath);
        break;
      case 'degit':
        await this.cloneWithDegit(template.source!, projectPath, projectName);
        break;
      case 'script':
        await this.runScriptTemplate(template.source!, projectPath, projectName);
        break;
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

  private async cloneWithDegit(repoUrl: string, destPath: string, appName: string): Promise<void> {
    const spinner = createSpinner(`Cloning template from ${repoUrl}...`).start();
    try {
      await execa('npx', ['tiged', '--mode=git', repoUrl, destPath]);
      spinner.success({ text: 'Template cloned successfully' });
    } catch (error) {
      spinner.error({ text: `Failed to clone template: ${error}` });
      throw error;
    }
  }

  private async runScriptTemplate(scriptPath: string, destPath: string, appName: string): Promise<void> {
    const fullScriptPath = path.join(path.dirname(__dirname), 'templates', scriptPath);
    const spinner = createSpinner(`Running script: ${scriptPath}...`).start();
    try {
      if (!existsSync(fullScriptPath)) {
        throw new Error(`Script file not found: ${fullScriptPath}`);
      }

      await execa('chmod', ['+x', fullScriptPath]);

      await execa(fullScriptPath, [destPath, appName], {
        stdio: 'inherit',
        shell: true,
      });

      spinner.success({ text: 'Script executed successfully' });
    } catch (error) {
      spinner.error({ text: `Failed to run script: ${error}` });
      throw error;
    }
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

  private async initializeGit(projectPath: string): Promise<void> {
    const spinner = createSpinner('Initializing Git repository...').start();
    try {
      await execa('git', ['init'], { cwd: projectPath });
      await execa('git', ['add', '.'], { cwd: projectPath });
      await execa('git', ['commit', '-m', 'Initial commit'], { cwd: projectPath });

      spinner.success({ text: 'Git repository initialized successfully\nTo begin push, add remote repository' });
    } catch (error) {
      spinner.error({ text: `Failed to initialize Git repository: ${error}` });
      throw error;
    }
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
}

export default CreateSoldevApp