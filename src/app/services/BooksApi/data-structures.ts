export class InputData {
    constructor(public author: string = '',
                public title: string = '') {}
  }
  
export class KeywordParams {
    constructor(public inauthor?: string,
                public intitle?: string) {}
}
