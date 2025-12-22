import * as fs from 'fs';
import { resolve, join } from 'path';
import * as express from 'express';
import { INestApplication } from '@nestjs/common';

export function serveFrontend(app: INestApplication) {
  const staticPath = join(__dirname, '../../', 'public');
  const indexPath = join(staticPath, 'index.html');
  if (fs.existsSync(staticPath) && fs.existsSync(indexPath)) {
    app.use(express.static(staticPath));
    app.use((req, res, next) => {
      if (req.path.startsWith('/api')) return next();
      res.sendFile(join(indexPath));
    });
  }
}
