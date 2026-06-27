class FieldError extends Error {
  public filed: string;

  constructor(message: string, field: string) {
    super(message);
    this.filed = field;
    this.name = this.name;
  }
}

export default FieldError;
