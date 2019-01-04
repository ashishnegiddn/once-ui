# oui-icon
`oui-icon`  makes it easier to use  _vector-based_  icons in your app. This directive supports only SVG icons.

# Registering Icons
`OuiIconRegistry`  is an injectable service that allows you to associate icon names with SVG URLs, its' methods are discussed below and listed in the API summary.

## Named icons
To associate a name with an icon URL, use the `addSvgIcon`. The methods of `OuiIconRegistry`. After registering an icon, it can be displayed by setting the `svgIcon` input with the icon name. 

## Theming
By default, icons will use the current font color (`currentColor`). This color can be changed to match the current theme's colors using the `color` attribute. This can be changed to  `'primary'`,  `'accent'`, or  `'warn'`.

## API references
**OuiIconModule**

`import { OuiIconModule } from '@once/ui';`

**OuiIconRegistery**

You need to inject `OuiIconRegistry` service in your component like as follows-
 
 ```
 import { OuiIconRegistry } from '@once/ui';
 export class AppComponent {
    constructor(
        private matIconRegistry: OuiIconRegistry,
        private domSanitizer: DomSanitizer
      ) {
          this.matIconRegistry.addSvgIcon(
            `local`,
            this.domSanitizer.bypassSecurityTrustResourceUrl(
              `/assets/images/v-green.svg`
            )
          );
      }
 }
 ```
 

## Services
### `OuiIconRegistry`
Service to register and display icons used by the  `<oui-icon>`  component.

-   Registers icon URLs by namespace and name.
-   Registers icon set URLs by namespace.
-   Loads icons from URLs and extracts individual icons from icon sets.

## Methods
| Name | Description | Parameters | Returns |
| --- | --- | --- | --- |
| `addSvgIcon` | Registers an icon by URL in the default namespace. | **iconName[String]:** Name under which the icon should be registered. <br/>**url:** `SafeResourceUrl` | `this` |
| `addSvgIconSet` | Registers an icon set by URL in the default namespace. |**url:** `SafeResourceUrl`|`this`|


#### Usage
**addSvgIcon:**
```
    this.matIconRegistry.addSvgIcon(
      `icon-dummy-name`,
      domSanitizer.bypassSecurityTrustResourceUrl(`/assets/anysvg.svg`)
    );
    
    <oui-icon svgIcon="icon-dummy-name"></oui-icon>
```
**addSvgIconSet:**

```
    this.matIconRegistry.addSvgIconSet(
      this.domSanitizer.bypassSecurityTrustResourceUrl(`https://soqacdnstorage.blob.core.windows.net/cdnapp2/fonts/symbol-defs.svg`)
    )
    <oui-icon svgIcon="icon-bullhorn" inline="true" color="primary"></oui-icon>
```

## Directives
###  `OuiIcon`

Component to display an icon. It can be used in the following ways:
- Specify the svgIcon input to load an SVG icon from a URL previously registered with the addSvgIcon, addSvgIconSet.
**Examples:** `<oui-icon svgIcon="[name]"></oui-icon> <oui-icon svgIcon="building"></oui-icon>`

> Selector:  oui-icon
> Exported As: ouiIcon

## Properties

| Name  | Description |
| ------------- | ------------- |
| @Input() <br/>`color: Theme`  | Theme color palette for the component.  |
| @Input() <br/>`svgIcon: String`  | Name of the icon in the SVG icon set.  |
| @Input() <br/>`inline: boolean`  | Whether the icon should be inlined, automatically sizing the icon to match the font size of the element the icon is contained in.  |
| @Input() <br/>`aria-label:String`  | Used to set the aria-label attribute on the underlying element.  |
| @Input() <br/>`aria-labelledby: String`  | Used to set the aria-labelledby attribute on the underlying element.  |

## Accessibility

OuiIcon should be given a meaningful label via `aria-label` or `aria-labelledby`.

## Stackblitz demo link

[https://stackblitz.com/edit/oui-icon-1](https://stackblitz.com/edit/oui-icon-1)

You can click here and can change code to try and test different scenarios. 