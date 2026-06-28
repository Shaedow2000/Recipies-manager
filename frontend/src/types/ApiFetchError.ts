class ApiFetchError extends Error {
  public status: number;

  constructor(statusText: string, statusCode: number) {
    super(statusText);
    this.name = this.name;
    this.message = statusText;
    this.status = statusCode;
  }
}

export default ApiFetchError;
