import Handlebars from 'handlebars';
import path from 'path';
import fs from 'node:fs';

/**
 * This function is responsible for generate a handlebars template.
 * @param templateName string
 * @param title string
 * @returns string
 */
const generate = (templateName: string, title: string) => {
    const source = fs.readFileSync(path.resolve(__dirname, `../views/${templateName}.handlebars`), 'utf8');
    const template = Handlebars.compile(source);

    const data = { title };
    const html = template(data);

    return html;
};

export const template = {
    generate
};