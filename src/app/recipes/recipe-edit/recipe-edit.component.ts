import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  private editMode: 'new'|'edit' = 'new'

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: Data) => {
      if (data['recipe'] !== undefined)
      {
        this.editMode = 'edit'
      }
    })
  }

}
