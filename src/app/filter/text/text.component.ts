import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Field} from "../../decorators/ord.typeclass";

@Component({
  moduleId: module.id,
  selector: 'field-text',
  templateUrl: 'text.component.html',
  styleUrls: ['text.component.css']
})
export class TextComponent {

  @Output()
  public filterChange:EventEmitter<any> = new EventEmitter();

  @Input()
  public field:Field;

  @Input()
  public props:Object;

  public update() {
    if(!this.props["eq"][this.field.name]) this.props["eq"][this.field.name] = null;
    this.filterChange.emit(this.props);
  }
}
