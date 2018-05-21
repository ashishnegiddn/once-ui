import {
    Component,
    ViewEncapsulation } from '@angular/core';
import * as readmeFile from '../../lib/drop-down/README.md';
@Component({
    selector: 'storybook-introduction',
    templateUrl: 'storybook-introduction.component.html',
    styleUrls: ['storybook-introduction.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class IntroductionComponent {
    howToUse: any = `import { DropDownModule } from '@once/ui/drop-down';<br>
        import { DatepickerModule } from '@once/ui/datepicker';<br><br>

        @NgModule({<br>
        &nbsp;&nbsp;imports: [<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DropDownModule,<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DatepickerModule<br>
            &nbsp;&nbsp;]<br>
        });<br>`;
}