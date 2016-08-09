import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Field,IField} from "decorator-ord";

@Component({
  moduleId: module.id,
  selector: 'field-text',
  templateUrl: 'text.component.html',
  styleUrls: ['text.component.css']
})
export class TextComponent {

  @Output()
  public filterChange:EventEmitter<IField> = new EventEmitter<IField>();

  @Input()
  public field:Field;

  @Input()
  public props:Object;

  public update() {
    if(!this.props["eq"][this.field.name]) this.props["eq"][this.field.name] = null;
    this.filterChange.emit(this.field);
  }
}
