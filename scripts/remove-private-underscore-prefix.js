import { Project, ts } from "ts-morph";

const project = new Project({
  tsConfigFilePath: "tsconfig.json",
});

const files = [
  ...project.getSourceFiles("src/app/**/*.ts"),
  ...project.getSourceFiles("lib/**/*.ts"),
];

files.forEach((file) => {
  file.getClasses().forEach((cls) => {
    const getterSetterNames = new Set();
    const usedIdentifiers = new Set();

    // Track getter/setter names
    cls.getGetAccessors().forEach((getter) => {
      getterSetterNames.add(getter.getName());
      getter.getDescendantsOfKind(ts.SyntaxKind.Identifier).forEach((id) => {
        usedIdentifiers.add(id.getText());
      });
    });

    cls.getSetAccessors().forEach((setter) => {
      getterSetterNames.add(setter.getName());
      setter.getDescendantsOfKind(ts.SyntaxKind.Identifier).forEach((id) => {
        usedIdentifiers.add(id.getText());
      });
    });

    // --- Rename private fields ---
    cls.getProperties().forEach((prop) => {
      const name = prop.getName();

      if (
        prop.hasModifier("private") &&
        name.startsWith("_") &&
        !getterSetterNames.has(name.slice(1))
      ) {
        const newName = name.slice(1);
        console.log(
          `Renaming property ${name} → ${newName} in ${file.getBaseName()}`,
        );
        prop.rename(newName);
      }
    });

    // --- Rename private methods ---
    cls.getMethods().forEach((method) => {
      const name = method.getName();

      if (
        method.hasModifier("private") &&
        name.startsWith("_") &&
        !usedIdentifiers.has(name) // skip if called in getter/setter
      ) {
        const newName = name.slice(1);
        console.log(
          `Renaming method ${name} → ${newName} in ${file.getBaseName()}`,
        );
        method.rename(newName);
      }
    });
  });
});

project.saveSync();
