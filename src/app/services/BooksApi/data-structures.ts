export class InputData {
    constructor(public author: string = '',
                public title: string = '') {}

    public toString(): string {
      return `author:${this.author};title:${this.title}`;
    }
  }
  
export interface KeywordParams {
    inauthor?: string;
    intitle?: string;
}


export enum InfoType {
  NONE = 'none',
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success'
}

export interface FormResult {
  type?: InfoType;
  message?: string;
}