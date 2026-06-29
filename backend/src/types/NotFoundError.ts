class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.name;
  }
}

export default NotFoundError;
