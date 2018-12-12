import { Directionality } from '@angular/cdk/bidi';
import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  Inject,
  InjectionToken,
  NgZone,
  Optional,
  ViewChild,
  ViewEncapsulation,
  OnDestroy
} from '@angular/core';
import {
  LabelOptions,
  MAT_LABEL_GLOBAL_OPTIONS,
  mixinColor
} from '@angular/material/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OuiFormFieldControl } from './form-field-control';
import { Platform } from '@angular/cdk/platform';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { getOuiFormFieldMissingControlError } from './form-field-errors';

/**
 * Boilerplate for applying mixins to OuiFormField.
 * @docs-private
 */
export class OuiFormFieldBase {
  constructor(public _elementRef: ElementRef) {}
}

/**
 * Base class to which we're applying the form field mixins.
 * @docs-private
 */
export const _OuiFormFieldMixinBase: typeof OuiFormFieldBase = mixinColor(
  OuiFormFieldBase
);

/** Possible appearance styles for the form field. */
export type OuiFormFieldAppearance = 'legacy' | 'standard' | 'fill' | 'outline';

/**
 * Represents the default options form the form field that can be configured
 * using the `OUI_FORM_FIELD_DEFAULT_OPTIONS` injection token.
 */
export interface OuiFormFieldDefaultOptions {
  appearance?: OuiFormFieldAppearance;
}

/**
 * Injection token that can be used to configure the
 * default options for all form field within an app.
 */
export const OUI_FORM_FIELD_DEFAULT_OPTIONS = new InjectionToken<
  OuiFormFieldDefaultOptions
>('OUI_FORM_FIELD_DEFAULT_OPTIONS');

/** Container for form controls that applies Material Design styling and behavior. */
@Component({
  selector: 'oui-form-field',
  exportAs: 'ouiFormField',
  templateUrl: 'form-field.html',
  // OuiInput is a directive and can't have styles, so we need to include its styles here
  // in form-field-input.css. The OuiInput styles are fairly minimal so it shouldn't be a
  // big deal for people who aren't using OuiInput.
  styleUrls: ['form-field.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    class: 'oui-form-field',
    '[class.oui-form-field-appearance-standard]': 'appearance == "standard"'
  },
  // tslint:disable-next-line:use-input-property-decorator
  inputs: ['color'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OuiFormField extends _OuiFormFieldMixinBase
  implements AfterContentInit, AfterContentChecked, AfterViewInit, OnDestroy {
  private _labelOptions: LabelOptions;

  private _destroyed = new Subject<void>();

  /** Whether the Angular animations are enabled. */
  _animationsEnabled: boolean;

  /**
   * @deprecated
   * @breaking-change 8.0.0
   */
  @ViewChild('underline')
  underlineRef: ElementRef;
  @ViewChild('connectionContainer')
  _connectionContainerRef: ElementRef;
  @ViewChild('inputContainer')
  _inputContainerRef: ElementRef;
  @ViewChild('label')
  private _label: ElementRef;
  @ContentChild(OuiFormFieldControl)
  _control: OuiFormFieldControl<any>;

  constructor(
    public _elementRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef,
    @Optional()
    @Inject(MAT_LABEL_GLOBAL_OPTIONS)
    labelOptions: LabelOptions,
    @Optional() private _dir: Directionality,
    @Optional()
    @Inject(OUI_FORM_FIELD_DEFAULT_OPTIONS)
    private _defaults: OuiFormFieldDefaultOptions,
    // @breaking-change 8.0.0 _platform, _ngZone and _animationMode to be made required.
    private _platform?: Platform,
    private _ngZone?: NgZone,
    @Optional()
    @Inject(ANIMATION_MODULE_TYPE)
    _animationMode?: string
  ) {
    super(_elementRef);

    this._labelOptions = labelOptions ? labelOptions : {};
    this._animationsEnabled = _animationMode !== 'NoopAnimations';
  }

  ngAfterContentInit() {
    this._validateControlChild();

    const control = this._control;

    if (control.controlType) {
      this._elementRef.nativeElement.classList.add(
        `oui-form-field-type-${control.controlType}`
      );
    }

    // Run change detection if the value changes.
    if (control.ngControl && control.ngControl.valueChanges) {
      control.ngControl.valueChanges
        .pipe(takeUntil(this._destroyed))
        .subscribe(() => this._changeDetectorRef.markForCheck());
    }
  }

  ngAfterContentChecked() {
    this._validateControlChild();
  }

  ngAfterViewInit() {
    // Avoid animations on load.
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  /** Throws an error if the form field's control is missing. */
  protected _validateControlChild() {
    if (!this._control) {
      throw getOuiFormFieldMissingControlError();
    }
  }
}
