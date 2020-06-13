import express from 'express';
import cors from 'cors';

class App {
  public express: express.Application;

  constructor() {

    this.express = express();

    this.express.use(express.json());
    this.express.use(cors({ origin: true }));

  }
}

export default new App().express;