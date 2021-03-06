/**
 * Configuration for opening a dialog.
 */
export class OnceDialogConfig {
  /** Header section */
  header?: any = {
    title: {
      text: '',
      icon: ''
    },
    video: {
      tooltip: 'Video'
    },
    article: {
      tooltip: 'Article'
    }
  };

  /** Footer section */
  footer?: {
    buttons: any;
    linkButtons: any;
  };

  /** Name of the themes */
  theme?: string;

  /** Dialog size **/
  size = 'small';

  /** Dialog- modal or popup **/
  modal = false;

  /** Escape - if true dialog gets closed on escape button press from keyboard **/
  escape = false;
}
