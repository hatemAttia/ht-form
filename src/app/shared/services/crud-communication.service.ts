import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class CrudCommunicationService {

  private eventStreams = new Map<string, Subject<any>>();

  emit<T>(eventKey: string, data: T): void {
    
    if (!this.eventStreams.has(eventKey)) {
      this.eventStreams.set(eventKey, new Subject<T>());
    }    
    this.eventStreams.get(eventKey)!.next(data);
  }

  on<T>(eventKey: string): Observable<T> {
    if (!this.eventStreams.has(eventKey)) {
      this.eventStreams.set(eventKey, new Subject<T>());
    }
    return this.eventStreams.get(eventKey)!.asObservable();
  }
  
}
