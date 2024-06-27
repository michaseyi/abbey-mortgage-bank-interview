export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class DatabaseError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export class UnauthorizedError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export class ConflictError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'ConflictError';
  }
}
