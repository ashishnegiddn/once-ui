import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { OuiCheckboxModule } from '../../../projects/ui/src/lib/oui';
import { select, boolean } from '@storybook/addon-knobs';
import markdownText from '../../../projects/ui/src/lib/oui/checkbox/README.md';

storiesOf('Checkbox', module).add(
  'default',
  () => ({
    moduleMetadata: {
      imports: [OuiCheckboxModule],
      schemas: [],
      declarations: []
    },
    template: `<oui-checkbox
                class="example-margin"
                [(ngModel)]="checked"
                [labelPosition]="position"
                (change)="changed($event)"
                [disabled]="disabled">
                I'm a checkbox
              </oui-checkbox>`,
    props: {
      changed: action('change'),
      position: select('labelPosition', ['before', 'after'], 'after'),
      disabled: boolean('disabled', false),
      checked: boolean('checked', false)
    }
  }),
  { notes: { markdown: markdownText } }
);