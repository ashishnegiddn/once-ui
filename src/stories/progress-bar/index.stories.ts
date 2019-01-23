import { storiesOf, addDecorator } from '@storybook/angular';
import { setOptions } from '@storybook/addon-options';
import { select, number } from '@storybook/addon-knobs';
import { OuiProgressBar } from '../../../projects/ui/src/lib/oui/progress-bar/progress-bar';
import markdownText from '../../../projects/ui/src/lib/oui/progress-bar/README.md';
import { withNotes } from '@storybook/addon-notes';

addDecorator(withNotes);

const strokeWidthOptions = {
  range: true,
  min: 1,
  max: 20,
  step: 1
};
const valueOptions = {
  range: true,
  min: 1,
  max: 100,
  step: 1
};
storiesOf('Progress Bar', module)
  .add(
    'determinate',
    () => ({
      component: OuiProgressBar,
      props: {
        color: select('color', ['primary', 'accent', 'warn'], 'primary'),
        strokeWidth: number('strokeWidth', 5, strokeWidthOptions),
        value: number('value', 60, valueOptions)
      }
    }),
    { notes: { markdown: markdownText } }
  )
  .add(
    'indeterminate',
    () => ({
      setOptions: setOptions({ downPanelInRight: true }),
      component: OuiProgressBar,
      props: {
        color: select('color', ['primary', 'accent', 'warn'], 'primary'),
        strokeWidth: number('strokeWidth', 5, strokeWidthOptions)
      }
    }),
    { notes: { markdown: markdownText } }
  );