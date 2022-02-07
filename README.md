# React components as package.
A bolierplate code to get started with writing reusable react components that can be published to as npm modules.

```
git clone https://github.com/adityawankhede5/component-as-package-boilerplate.git
```

After it is cloned install the required dependencies with `npm i`

1. Write all your components inside `lib/components` folder.
1. Write import and export for your components inside `lib/index.js`. 
1. Build the components using `npm run build` command.
1. Now you are ready to publish.
1. For publishing first time, make sure you change the `"name"` inside `package.json` this is the name of your npm package.
1. To publish the components run `npm publish` command. You might need to login to npm using the `npm login` command.