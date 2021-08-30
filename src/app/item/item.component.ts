import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Item } from '../item';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  items: Item[];
  selectedItem: Item = { id : null , number:null, amount: null};
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getList();
  }

  getList(){ 
    this.apiService.readItems().subscribe((items: Item[])=>{
      this.items = items;
    })
  }
  
  
  createOrUpdateItem(form:NgForm){
    if(form.valid){
      if(this.selectedItem && this.selectedItem.id){
        form.value.id = this.selectedItem.id;
        this.apiService.updateItem(form.value).subscribe((item: Item)=>{
          this.getList(); // <== Fetching list again after update
         alert('Updated Succesfully');
        });
      }
      else{
        this.apiService.createItem(form.value).subscribe((item: Item)=>{
          this.getList(); // <== Fetching list again after update
          alert('Created Succesfully');
        });
      }
   }

  }

  selectItem(item: Item){
    this.selectedItem = item;
  }

  deleteItem(id:any){
    this.apiService.deleteItem(id).subscribe((item: Item)=>{
      alert("Item deleted");
    });
  }

}
