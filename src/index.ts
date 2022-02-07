import "./polyfill";
import glob from "fast-glob";
import fs from "fs";
import path from "path";
import { parse, SFCDescriptor } from "@vue/compiler-sfc";
// @ts-ignore
import toString from "vue-sfc-descriptor-to-string";
import assert from "assert";
import minimist from "minimist";
import TemplateGenerator from "./template-generator";
import prettier from "prettier";
import jsBeautify from "js-beautify";

async function main() {
  const args = minimist(process.argv.slice(2), {
    default: {
      output: "output",
    },
  });

  assert.ok(args.output, "output required");
  assert.ok(args.input, "input required");

  const relatePathT = path
    .relative(process.cwd(), path.resolve(process.cwd(), args.input))
    .replace(/\\/g, "/");
  const files = await glob([`${relatePathT}/**/*.vue`]);
  const descriptors: Array<SFCDescriptor & { path: string }> = [];
  console.log(`${relatePathT}/**/*.vue`, files);
  await Promise.all(
    files.map(async (file) => {
      if (/\.vue$/.test(file)) {
        const sfc = parse(await fs.promises.readFile(file, "utf8"));
        const { template } = sfc.descriptor;
        if (template && template.ast) {
          fs.promises.writeFile(
            "output.json",
            JSON.stringify(template?.ast, null, 2)
          );
          template.content = await new TemplateGenerator({
            ast: template.ast as any,
          })
            .transform()
            .generate();
        }
        descriptors.push({
          ...sfc.descriptor,
          path: file,
        });
      }
    })
  );

  for (const desc of descriptors) {
    let formatted = jsBeautify.html(desc.template!.content, {
      wrap_attributes: "auto",
    });
    desc.template!.content = formatted;
    const raw = toString(desc);
    formatted = prettier.format(raw, {
      parser: "vue",
      semi: false,
      tabWidth: 4,
      singleQuote: false,
      // 有bug see https://github.com/prettier/prettier/issues/11484
      // 类似这样 <span>
      //           {{
      //             xxxx
      //           }}</span
      //          >
      bracketSameLine: true,
    });
    const rePath = path.relative(relatePathT, desc.path);
    const outputPath = path.resolve(process.cwd(), args.output, rePath);
    await fs.promises.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.promises.writeFile(outputPath, formatted, "utf8");
  }
}

main();
