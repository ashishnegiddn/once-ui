import { storiesOf } from '@storybook/angular';
import {
  OuiSelectModule,
  OuiFormFieldModule,
  OuiInputModule
} from '../../../projects/ui/src/lib/oui';
import {
  array,
  boolean,
  text,
  object,
  select
} from '@storybook/addon-knobs/angular';
import { action } from '@storybook/addon-actions';
import markdownText from '../../../projects/ui/src/lib/oui/select/README.md';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { APPEARANCE } from '../const';

/**
 * Select Customizing the trigger label
 */
@Component({
  selector: 'oui-select-storybook',
  template: `
    <div style="max-width: 270px;">
      <oui-form-field [appearance]="appearance" color="accent">
        <oui-select
          [placeholder]="placeholder"
          [formControl]="toppings"
          multiple
        >
          <oui-select-trigger>
            {{ toppings.value ? toppings.value[0] : '' }}
            <span
              *ngIf="toppings.value?.length > 1"
              class="example-additional-selection"
            >
              (+{{ toppings.value.length - 1 }}
              {{ toppings.value?.length === 2 ? 'other' : 'others' }})
            </span>
          </oui-select-trigger>
          <oui-select-search [(ngModel)]="keyword"></oui-select-search>
          <oui-option
            *ngFor="let topping of (toppingList | filterOptions: keyword)"
            [value]="topping"
            >{{ topping }}
          </oui-option>
          <div
            *ngIf="!(toppingList | filterOptions: keyword).length"
            class="noResults"
          >
            No results match "{{ keyword }}"
          </div>
        </oui-select>
      </oui-form-field>
    </div>
  `
})
export class OuiSelectCustomizeTriggerStorybook {
  @Input() placeholder: string = '';
  @Input() appearance: string = '';
  toppings = new FormControl();
  toppingList = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato'
  ];
}

storiesOf('Form Field/Select', module)
  .add(
    'Regular',
    () => ({
      template: `
    <div style="width: 213px;">
      <oui-form-field>
        <oui-select (change)="onChange($event)" [placeholder]="placeholder" [disabled]="disabled">
          <oui-option *ngFor="let food of foods" [value]="food">
            {{food}}
          </oui-option>
        </oui-select>
      </oui-form-field>
    </div>
    `,
      props: {
        foods: array('foods', ['Pizza', 'Burgers', 'Steak', 'Tacos']),
        placeholder: text('placeholder', 'Favorite food'),
        disabled: boolean('disabled', false),
        onChange: action('change')
      },
      moduleMetadata: {
        imports: [
          OuiFormFieldModule,
          OuiInputModule,
          OuiSelectModule,
          FormsModule,
          ReactiveFormsModule
        ]
      }
    }),
    { notes: { markdown: markdownText } }
  )
  .add(
    'Multi select',
    () => ({
      template: `
    <div style="width: 213px;">
      <oui-form-field>
        <oui-select (change)="onChange($event)" [placeholder]="placeholder" multiple [disabled]="disabled">
          <oui-option *ngFor="let food of foods" [value]="food">
            {{food}}
          </oui-option>
        </oui-select>
      </oui-form-field>
    </div>
    `,
      props: {
        foods: array('foods', ['Pizza', 'Burgers', 'Steak', 'Tacos']),
        placeholder: text('placeholder', 'Favorite food'),
        disabled: boolean('disabled', false),
        onChange: action('change')
      },
      moduleMetadata: {
        imports: [
          OuiFormFieldModule,
          OuiInputModule,
          OuiSelectModule,
          FormsModule,
          ReactiveFormsModule
        ]
      }
    }),
    { notes: { markdown: markdownText } }
  )
  .add(
    'Groups',
    () => ({
      template: `
    <div style="width: 213px;">
      <oui-form-field>
        <oui-select (change)="onChange($event)" [placeholder]="placeholder" [disabled]="disabled">
          <oui-option>-- None --</oui-option>
          <oui-optgroup *ngFor="let group of foodGroups" [label]="group.name">
            <oui-option *ngFor="let food of group.foods" [value]="food">
              {{food}}
            </oui-option>
          </oui-optgroup>
        </oui-select>
      </oui-form-field>
    </div>
    `,
      props: {
        foodGroups: object('foodGroups', [
          {
            name: 'Fruit',
            foods: ['Apple', 'Orange']
          },
          {
            name: 'Vegetables',
            foods: [
              'Lettuce',
              'Broccoli',
              'Corn',
              'Cucumber',
              'Lettuce',
              'Pumpkin',
              'Tomato'
            ]
          },
          {
            name: 'Meats',
            foods: ['Steak', 'Chicken']
          }
        ]),
        disabled: boolean('disabled', false),
        placeholder: text('placeholder', 'Foods'),
        onChange: action('change')
      },
      moduleMetadata: {
        imports: [
          OuiFormFieldModule,
          OuiInputModule,
          OuiSelectModule,
          FormsModule,
          ReactiveFormsModule
        ]
      }
    }),
    { notes: { markdown: markdownText } }
  )
  .add('Search options', () => ({
    template: `
    <div style="width: 213px;">
      <oui-form-field>
        <oui-select (change)="onChange($event)" [placeholder]="placeholder" [disabled]="disabled">
          <oui-select-search [(ngModel)]="keyword"></oui-select-search>
          <oui-option *ngFor="let food of (foods | filterOptions: keyword)" [value]="food">
            {{food}}
          </oui-option>
          <div
            *ngIf="!(foods | filterOptions: keyword).length"
            class="noResults"
          >
            No results match "{{ keyword }}"
          </div>
        </oui-select>
      </oui-form-field>
    </div>
    `,
    props: {
      foods: array('foods', ['Pizza', 'Burgers', 'Steak', 'Tacos']),
      placeholder: text('placeholder', 'Favorite food'),
      disabled: boolean('disabled', false),
      onChange: action('change')
    },
    moduleMetadata: {
      imports: [
        OuiFormFieldModule,
        OuiInputModule,
        OuiSelectModule,
        FormsModule,
        ReactiveFormsModule
      ]
    }
  }))
  .add(
    'Customize trigger',
    () => ({
      moduleMetadata: {
        imports: [
          OuiFormFieldModule,
          OuiInputModule,
          OuiSelectModule,
          FormsModule,
          ReactiveFormsModule
        ],
        schemas: [],
        declarations: [OuiSelectCustomizeTriggerStorybook]
      },
      template: `<oui-select-storybook [placeholder]="placeholder" [appearance]="appearance"></oui-select-storybook>`,
      props: {
        placeholder: text('placeholder', 'Favourite topping'),
        appearance: select('appearance', APPEARANCE, APPEARANCE[0]),
        onChange: action('change')
      }
    }),
    { notes: { markdown: markdownText } }
  );
