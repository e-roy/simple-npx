#!/usr/bin/env node

import { prompt } from "enquirer";
import * as fs from "fs-extra";
import * as path from "path";

const copyTemplateFiles = async (srcDir: string, destDir: string) => {
  try {
    await fs.ensureDir(destDir);
    await fs.copy(srcDir, destDir);
    console.log(`Your new React app ${destDir} has been created!`);
  } catch (err) {
    console.error("An error occurred while copying the template:", err);
  }
};

const main = async () => {
  const response: { appName: string; template: "default" | "typescript" } =
    await prompt([
      {
        type: "input",
        name: "appName",
        message: "What is the name of your app?",
      },
      {
        type: "select",
        name: "template",
        message: "Choose a template:",
        choices: ["default", "typescript"],
      },
    ]);

  const templatePath = path.join(
    __dirname,
    "../src/templates",
    response.template
  );
  const appPath = path.join(process.cwd(), response.appName);
  await copyTemplateFiles(templatePath, appPath);
};

main();
