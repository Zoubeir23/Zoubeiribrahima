// Gives an operation a deadline: a database that is waking up must not hold a visitor's request.

export class TimeoutError extends Error {
  constructor(durationInMilliseconds: number) {
    super(`No answer after ${durationInMilliseconds} ms`);
    this.name = "TimeoutError";
  }
}

export function withTimeout<Value>(operation: Promise<Value>, durationInMilliseconds: number): Promise<Value> {
  return new Promise<Value>((resolve, reject) => {
    const timer = setTimeout(() => reject(new TimeoutError(durationInMilliseconds)), durationInMilliseconds);
    operation.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error: unknown) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}
