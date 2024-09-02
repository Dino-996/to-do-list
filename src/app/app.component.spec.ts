import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should update the check status of an item', () => {
    const event = { target: { checked: true } } as unknown as Event;
    const itemId = 0;

    component.onChecked(event, itemId);

    const item = component.list.find(item => item.id === itemId);

    expect(item).toBeTruthy();
    expect(item?.check).toBeTrue();
  });

  it('should add a new item to the list and clear the input', () => {
    const initialLength = component.list.length;
    const newText = 'New Item';

    component.addItem(newText);

    expect(component.list.length).toBe(initialLength + 1);
    expect(component.list[component.list.length - 1].text).toBe(newText);
    expect(component.inputText()).toBe('');
  });

  it('should delete an item from the list', () => {
    const itemId = 0;
    const initialLength = component.list.length;

    const itemExistsBefore = component.list.some(item => item.id === itemId);
    expect(itemExistsBefore).toBeTrue();

    component.deleteItem(itemId);

    expect(component.list.length).toBe(initialLength - 1);
    expect(component.list.find(item => item.id === itemId)).toBeUndefined();
  });

  it('should save the edit if editText is not empty', () => {
    const itemId = 1;
    const item = component.list.find(item => item.id === itemId);

    if (item) {
      item.editText = 'Updated Text';
      component.saveEdit(item);

      expect(item.text).toBe('Updated Text');
      expect(item.isEditing).toBeFalse();
    }
  });
});
