import {Component, Output, Input, EventEmitter } from '@angular/core';
import {Field} from "../../decorators/ord.typeclass";
import {IField} from "../../decorators/eq.typeclass";

@Component({
  moduleId: module.id,
  selector: 'field-date-range',
  templateUrl: 'date-range.component.html',
  styleUrls: ['date-range.component.css']
})
export class DateRangeComponent {

  @Output()
  public filterChange : EventEmitter<IField> = new EventEmitter<IField>();

  @Input()
  public field:Field;

  @Input()
  public props:Object;

  public update(){
    this.filterChange.emit(this.field);
  }
}
