import {Component, OnInit, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'list-length',
  templateUrl: 'list-length.component.html',
  styleUrls: ['list-length.component.css']
})
export class ListLengthComponent implements OnInit {

  @Input()
  private length:number=3500;

  constructor(private router : Router) {
  }

  ngOnInit() {
  }

  update(){
    console.log("length ist ",this.length);
    this.router.navigate(['/cars',{limit:this.length}]);
  }
}
