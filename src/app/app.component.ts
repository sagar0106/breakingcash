import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  item = {};
  allItems = [];
  amount;
  value = 0;
  showErrMsg;
  showErrMsgValid;
  // #077696

  addItem() {
    this.showErrMsg = '';
    if (this.checkOverFlow()) {
      return;
    } else {
    this.value += this.item['denomination'] * this.item['total'];
    this.allItems.push(this.item);
    this.item = {};
    }
  }

  checkOverFlow() {
     if (this.value + (this.item['denomination'] * this.item['total']) > this.amount) {
      this.showErrMsg = 'Value is exceeding the amount.';
      return true;
     }
     return false;
  }

  checkIfValid() {
      if (this.amount < this.value) {
      this.showErrMsgValid = 'Amount cannot be less than value.';
      return;
     }
     this.showErrMsgValid = '';
     return;
  }

  removeItem(index) {
   const deletedItem = this.allItems.splice(index, 1);
   this.value -= deletedItem[0]['denomination'] * deletedItem[0]['total'];
  }
}
