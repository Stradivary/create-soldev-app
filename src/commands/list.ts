import { select } from '@inquirer/prompts';
import { Command } from '@oclif/core';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

import { TemplateInfo } from '../libs/TemplateInfo.js';

export default class List extends Command {

    static override description = 'list template versions from repository';

    static override examples = [
        '<%= config.bin %> <%= command.id %>',
    ];

    public async run(): Promise<void> {

        await this.listVersions();
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

    private async listVersions() {

        const templatePath = path.join('./', 'templates');
        const availableFrameworks = this.getTemplates(templatePath);

        await select({
            choices: availableFrameworks.map(framework => ({
                disabled: framework.disabled,
                name: `(${framework.version}) ({framework.id}) - ${framework.name}`,
                value: framework.id
            })),
            message: 'ℹ️ listing template versions from repository [alpha]',
        });
    }

}
