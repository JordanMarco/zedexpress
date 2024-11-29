export interface IError {
  errorCode?: number;
  errorStatus?: string;
  errorText?: string;
  stringErrorCode?: string;
}

export class Error implements IError {
  constructor(
    public errorCode?: number,
    public errorStatus?: string,
    public errorText?: string,
    public stringErrorCode?: string
  ) {}
}
