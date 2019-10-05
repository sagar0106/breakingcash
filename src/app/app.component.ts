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
  denominations = [2000, 500, 200, 100, 50, 20, 10];
  // #077696

  addItem() {
    this.showErrMsg = '';
    if (this.checkOverFlow()) {
      return;
    }
    this.value += this.item['denomination'] * this.item['total'];
    if (this.matchFound(this.item['denomination']) > -1) {
      this.allItems[this.matchFound(this.item['denomination'])].total += this.item['total'];
    } else {
      this.allItems.push(this.item);
    }
    this.item = {};
  }

  matchFound(denomination) {
    return this.allItems.findIndex((item) => {
      return item.denomination == denomination;
    });
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

  breakMyCash() {
    this.allItems = [];
    this.value = 0;
    let amtToBreak = this.amount;
    this.denominations.forEach(denomination => {
      if (amtToBreak > 0) {
        this.prepareItems(amtToBreak, denomination);
        amtToBreak = amtToBreak % denomination;
      }
    });
  }

  breakFromHere() {
    let amtToBreak = this.amount - this.value;
    this.denominations.forEach(denomination => {
      if (amtToBreak > 0 && this.matchFound(denomination) === -1) {
        this.prepareItems(amtToBreak, denomination);
        amtToBreak = amtToBreak % denomination;
      }
    });
  }

  prepareItems(amtToBreak, denomination) {
    let total;
    total = (amtToBreak / denomination);
    this.item['denomination'] = denomination;
    this.item['total'] = Math.floor(total);
    this.addItem();
  }
}
