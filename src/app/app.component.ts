import { Component, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface List {
  id: number;
  text: string;
  check: boolean;
  isEditing?: boolean;
  editText?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  public inputText: WritableSignal<string> = signal('');
  public list: Array<List> = [
    { id: 0, text: 'Ice Cream', check: false, isEditing: false, editText: '' },
    { id: 1, text: 'Water Melon', check: false, isEditing: false, editText: '' },
    { id: 2, text: 'Chocolate', check: false, isEditing: false, editText: '' }
  ];
  private nextId: number = this.list.length;

  /**
   * Updates the check status of an item in the list.
   * @param event the event emitted when the checkbox is clicked
   * @param itemId the id of the item to be updated
   */
  public onChecked(event: Event, itemId: number): void {
    const checkbox = event.target as HTMLInputElement;
    const targetItem = this.list.find(element => element.id === itemId);
    if (targetItem) {
      targetItem.check = checkbox.checked;
    }
  }

  /**
   * Adds a new item to the list and clears the input text.
   * @param text the text to be added as a new item
   */
  public addItem(text: string): void {
    if (text) {
      this.list.push({ id: this.nextId++, text: text, check: false });
    }
    this.inputText.set('');
  }

  /**
   * Removes an item from the list.
   * @param id the id of the item to be removed
   */
  public deleteItem(id: number): void {
    this.list = this.list.filter(element => element.id !== id);
  }

  /**
   * Sets the item to be in edit mode.
   * @param item the item to be set to edit mode
   */
  public editItem(item: List): void {
    item.isEditing = true;
    item.editText = item.text;

    setTimeout(() => {
      const inputText = document.getElementById('editText') as HTMLInputElement;
      if (inputText) {
        inputText.focus();
        inputText.select();
      }
    }, 1)
  }

  /**
   * Saves the changes made to the item when in edit mode.
   * If the editText is empty or contains only whitespace, the changes are discarded.
   * @param item the item to be saved
   */
  public saveEdit(item: List): void {
    if (item.editText && item.editText.trim()) {
      item.text = item.editText;
      item.isEditing = false;
    }
  }

  /**
   * Cancels the edit mode of the item.
   * @param item the item to cancel edit mode
   */
  public cancelEdit(item: List): void {
    item.isEditing = false;
    item.editText = '';
  }
}
