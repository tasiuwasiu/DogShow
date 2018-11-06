import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  errorMessages: string[] = [];
  warningMessages: string[] = [];
  successMessages: string[] = [];
  hasMessages = false;

  constructor() {
  }

  hasAnyMessages() {
    this.hasMessages = this.errorMessages.length !== 0
      || this.successMessages.length !== 0
      || this.warningMessages.length !== 0;
  }

  addError(message: string) {
    this.errorMessages.push(message);
    this.hasMessages = true;
  }

  addWarning(message: string) {
    this.warningMessages.push(message);
    this.hasMessages = true;
  }

  addSuccess(message: string) {
    this.successMessages.push(message);
    this.hasMessages = true;
  }

  removeError(index: number) {
    this.errorMessages.splice(index, 1);
    this.hasAnyMessages();
  }

  removeWarning(index: number) {
    this.warningMessages.splice(index, 1);
    this.hasAnyMessages();
  }

  removeSuccess(index: number) {
    this.successMessages.splice(index, 1);
    this.hasAnyMessages();
  }

  removeMessages() {
    this.errorMessages = [];
    this.warningMessages = [];
    this.successMessages = [];
    this.hasMessages = false;
  }
}
