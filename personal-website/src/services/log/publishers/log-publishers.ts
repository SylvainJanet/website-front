import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LogEntry } from '../log.service';

export abstract class LogPublisher {
  location: string = '';
  abstract log(record: LogEntry): Observable<boolean>;
  abstract clear(): Observable<boolean>;
}

export class LogConsole extends LogPublisher {
  log(entry: LogEntry): Observable<boolean> {
    // Log to console
    console.log(entry.buildLogString());
    return of(true);
  }

  clear(): Observable<boolean> {
    console.clear();
    return of(true);
  }
}

export class LogLocalStorage extends LogPublisher {
  constructor() {
    // Must call `super()`from derived classes
    super();

    // Set location
    this.location = 'logging';
  }

  // Append log entry to local storage
  log(entry: LogEntry): Observable<boolean> {
    let ret: boolean = false;
    let values: LogEntry[];

    try {
      // Get previous values from local storage
      values = localStorage.getItem(this.location)
        ? JSON.parse(localStorage.getItem(this.location) as string)
        : [];

      // Add new log entry to array
      values.push(entry);

      // Store array into local storage
      localStorage.setItem(this.location, JSON.stringify(values, null, '\n'));

      // Set return value
      ret = true;
    } catch (ex) {
      // Display error in console
      console.log(ex);
    }

    return of(ret);
  }

  // Clear all log entries from local storage
  clear(): Observable<boolean> {
    localStorage.removeItem(this.location);
    return of(true);
  }
}

export class LogWebApi extends LogPublisher {
  http: HttpClient;
  constructor(httpClient: HttpClient) {
    // Must call `super()`from derived classes
    super();

    //TODO : Set location
    this.location = '/api/log';
    this.http = httpClient;
  }

  // Add log entry to back end data store
  log(entry: LogEntry): Observable<boolean> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http
      .post(this.location, entry)
      .pipe(catchError(this.handleErrors))
      .pipe((response: any) => response);
  }

  // Clear all log entries from local storage
  clear(): Observable<boolean> {
    // TODO: Call Web API to clear all values
    return of(true);
  }

  private handleErrors(error: any): Observable<any> {
    let errors: string[] = [];
    let msg: string = '';

    msg = 'Status: ' + error.status;
    msg += ' - Status Text: ' + error.statusText;
    if (error) {
      msg += ' - Exception Message: ' + error.exceptionMessage;
    }
    errors.push(msg);

    console.error('An error occurred', errors);
    return throwError(errors);
  }
}
