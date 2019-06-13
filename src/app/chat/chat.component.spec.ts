import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatComponent } from './chat.component';
import { CommonServiceModule } from 'testing/CommonService.module';
import { SharedModule } from '../shared/shared.module';
import { ChatService } from '../services/chat.service';
import { DebugElement } from '@angular/core';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatComponent ],
      imports: [
        CommonServiceModule,
        SharedModule
      ],
      providers: [
        ChatService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();

    const chatService = de.injector.get(ChatService);

    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
