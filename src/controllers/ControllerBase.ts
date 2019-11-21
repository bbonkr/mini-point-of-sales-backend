import express = require('express');

export interface Controller {
  getPath(): string;
  getRouter(): express.Router;
}

export abstract class ControllerBase implements Controller {
  protected readonly router: express.Router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public abstract getPath(): string;

  public getRouter(): express.Router {
    return this.router;
  }

  protected abstract initializeRoutes(): void;
}
