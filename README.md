# BlogFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

### Code Style

- Use camelCase for variable and function names.
- Use `let` and `const` instead of `var`.
- Use arrow functions instead of function expressions when possible
- Use `===` and `!==` instead of `==` and `!=`.
- Use access modifiers (`public`, `private`, `protected`) for class members.

### Naming Conventions

- Use descriptive names for variables, functions, and classes.
- Use `I` as a prefix for interface names.
- Classes should be named based on their purpose

#### HTML

- Use Angular Material for ALL UI components for which the libary support.
  - There is a component for almost every UI element, including icons, buttons, tooltips, layouts, labels, etc
  - This requires browsing Angular Materials documentation to find the appropriate component for the desired functionality

- If necessary, Material components can be wrapped in a custom component to extend or customize functionality

- Use as few HTML elements as possible to achieve the desired layout.

#### CSS

  - Nesting is  critically important in order for styles to be applied without being overwritten by other style sheets