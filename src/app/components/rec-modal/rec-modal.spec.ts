import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecModal } from './rec-modal';

describe('RecModal', () => {
  let component: RecModal;
  let fixture: ComponentFixture<RecModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
