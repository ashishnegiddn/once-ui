import {
    Component,
    Input
} from '@angular/core';
import {OnceDialogConfig} from '../dialog-config';
import {DialogService} from '../dialog.service';

/**
 * Header component that wraps footer section
 */
@Component({
    selector: 'once-ui-dialog-footer',
    templateUrl: 'dialog.component.footer.html',
    styleUrls: ['./dialog.footer.component.scss'],
    host: {
        'class': 'onceUiDialogFooter'
    }
})
export class DialogFooterComponent {
    @Input() footerSettings: string;

    constructor(public _config: OnceDialogConfig, public dialog: DialogService) {
    }

  /**
   * Close event from footer
   */
  close() {
    this.dialog.close();
  }

  /**
   * Get obj keys
   */
  getKeys(obj){
    return Object.keys(obj);
  }

}
