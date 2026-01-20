import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiaryComponent } from './diary.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreService } from '../../services/store.service';

describe('DiaryComponent', () => {
  let component: DiaryComponent;
  let fixture: ComponentFixture<DiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiaryComponent, HttpClientTestingModule],
      providers: [StoreService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });})