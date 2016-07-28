import {Component, Output, Input, EventEmitter } from '@angular/core';
import {Field} from "../../decorators/ord.typeclass";

@Component({
  moduleId: module.id,
  selector: 'field-date-range',
  templateUrl: 'date-range.component.html',
  styleUrls: ['date-range.component.css']
})
export class DateRangeComponent {

  @Output()
  public filterChange : EventEmitter<any> = new EventEmitter();

  @Input()
  public field:Field;

  @Input()
  public props:Object;

  public update(){
    this.filterChange.emit(this.props);
  }
}