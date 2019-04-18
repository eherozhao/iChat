import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'api/ichat';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private http: HttpClient) { }

  SendMessage(senderId, receiverId, receiverName, message): Observable<any> {
    return this.http.post(
      `${BASEURL}/chat-messages/${senderId}/${receiverId}`,
      {
        receiverId,
        receiverName,
        message
      }
    );
  }

  GetAllMessages(senderId, receiverId): Observable<any> {
    return this.http.get(`${BASEURL}/chat-messages/${senderId}/${receiverId}`);
  }
}
