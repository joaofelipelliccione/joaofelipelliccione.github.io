import express from 'express';
import connectToDatabase from './connection';
import pingRoutes from './routes/pingRoutes';
import carsRoutes from './routes/carsRoutes';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.routes();
  }

  private routes(): void { // Método responsável pela disponibilização das rotas da API.
    this.app.use('/ping', pingRoutes);
    this.app.use('/cars', carsRoutes);
  }

  public startServer(PORT: string | number = 3001): void { // Método que "sobe" o servidor. Esse que será chamado no arquivo server.ts (index.ts, no caso)
    connectToDatabase();
    this.app.listen(
      PORT,
      () => console.log(`Server running here 👉 http://localhost:${PORT}`),
    );
  }

  public getApp() { // Necessário aos testes
    return this.app;
  }
}

export default App;
