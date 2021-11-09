import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from './../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})

export class MessageListComponent implements OnInit {
  messages: Message[] = [];
  subscription: Subscription;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messages = this.messageService.getMessages();
    this.subscription = this.messageService.messageListChangedEvent.subscribe((messagesList: Message[]) => this.messages = messagesList.slice())
    // this.messageService.messageChangedEvent.subscribe((messages) => this.messages = messages.slice());
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onAddMessage(message: Message): void {
    this.messageService.addMessage(message);
  }

}
