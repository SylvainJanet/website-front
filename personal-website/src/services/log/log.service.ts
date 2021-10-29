import { Injectable, Input, Type } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LogLevel } from './logLevel';
import { LogPublisher } from './publishers/log-publishers';
import { LogPublishersService } from './publishers/log-publishers.service';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  // https://www.codemag.com/article/1711021/Logging-in-Angular-Applications

  level: LogLevel = environment.logLevel;
  logWithDate: boolean = true;
  publishers: LogPublisher[];
  className: string = 'none specified';

  constructor(private publishersService: LogPublishersService) {
    // Set publishers
    this.publishers = this.publishersService.publishers;
  }

  withClassName(name: string) {
    let res = new LogService(this.publishersService);
    res.level = this.level;
    res.logWithDate = this.logWithDate;
    res.className = name;
    return res;
  }

  debug(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Debug, optionalParams);
  }

  info(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Info, optionalParams);
  }

  warn(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Warn, optionalParams);
  }

  error(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Error, optionalParams);
  }

  fatal(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Fatal, optionalParams);
  }

  log(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.All, optionalParams);
  }

  private writeToLog(msg: string, level: LogLevel, params: any[]) {
    if (this.shouldLog(level)) {
      let entry: LogEntry = new LogEntry();
      entry.message = msg;
      entry.level = level;
      entry.extraInfo = params;
      entry.logWithDate = this.logWithDate;
      entry.className = this.className;
      for (let logger of this.publishers) {
        logger.log(entry).subscribe(
          (response) => {
            if (!response) {
              console.log(
                'Erreur avec loggeur ' +
                  logger.constructor.name +
                  ' ' +
                  logger.location
              );
            }
          },
          (error) =>
            console.log(
              'Erreur avec loggeur ' +
                logger.constructor.name +
                ' ' +
                logger.location
            )
        );
      }
    }
  }

  private shouldLog(level: LogLevel): boolean {
    let ret: boolean = false;
    if (
      (level >= this.level && level !== LogLevel.Off) ||
      this.level === LogLevel.All
    ) {
      ret = true;
    }
    return ret;
  }
}
export class LogEntry {
  // Public Properties
  entryDate: Date = new Date();
  message: string = '';
  level: LogLevel = LogLevel.Debug;
  extraInfo: any[] = [];
  logWithDate: boolean = true;
  className: string = '';

  buildLogString(): string {
    let ret: string = '';

    if (this.logWithDate) {
      ret = new Date().toLocaleString() + ' - ';
    }

    ret += 'Class: ' + this.className;
    ret += ' - Type: ' + LogLevel[this.level];
    ret += ' - Message: ' + this.message;
    if (this.extraInfo.length) {
      ret += ' - Extra Info: ' + this.formatParams(this.extraInfo);
    }

    return ret;
  }

  private formatParams(params: any[]): string {
    let ret: string = params.join(',');

    // Is there at least one object in the array?
    if (params.some((p) => typeof p == 'object')) {
      ret = '';

      // Build comma-delimited string
      for (let item of params) {
        ret += JSON.stringify(item) + ',';
      }
    }

    return ret;
  }
}
