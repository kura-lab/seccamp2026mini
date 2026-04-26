/*
 * @license
 * Copyright 2026 Masaru Kurahayashi. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License
 */

import path from 'path';
import url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
import express from 'express';
import session from 'express-session';
import hbs from 'express-handlebars';
const app = express();
import useragent from 'express-useragent';
import firebaseJson from './firebase.json' with { type: 'json' };
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
//import { FirestoreStore } from '@google-cloud/connect-firestore';
import * as client from 'openid-client';
import { implicit } from './libs/implicit.mjs';
import { authzCode } from './libs/authzCode.mjs';
import { pkce } from './libs/pkce.mjs';
import { introspection } from './libs/introspection.mjs';

if (process.env.NODE_ENV === 'localhost') {
  process.env.DOMAIN = 'http://localhost:8080';
  process.env.GOOGLE_CLOUD_PROJECT = 'oidc-testapp';
  process.env.FIRESTORE_EMULATOR_HOST = `${firebaseJson.emulators.firestore.host}:${firebaseJson.emulators.firestore.port}`;
} else if (process.env.NODE_ENV === 'development') {
  process.env.DOMAIN = 'https://passkeys-demo.appspot.com';
}

initializeApp();

const views = path.join(__dirname, 'views');
app.set('view engine', 'html');
app.engine('html', hbs.engine({
  extname: 'html',
  defaultLayout: 'index',
  layoutsDir: path.join(views, 'layouts'),
  partialsDir: path.join(views, 'partials'),
}));
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(useragent.express());
app.use(express.static('public'));
app.use(express.static('dist'));
app.use(session({
  secret: 'secret', // You should specify a real secret here
  resave: true,
  saveUninitialized: false,
  proxy: true,
//  store: new FirestoreStore({
//    dataset: getFirestore(),
//    kind: 'express-sessions',
//  }),
  cookie:{
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'localhost',
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
  }
}));

const RP_NAME = 'Seccamp 2026 mini OAuth 2.0 & OpenID Connect';

app.use((req, res, next) => {
  process.env.HOSTNAME = req.hostname;
  const protocol = process.env.NODE_ENV === 'localhost' ? 'http' : 'https';
  process.env.ORIGIN = `${protocol}://${req.headers.host}`;
  process.env.RP_NAME = RP_NAME;
  req.schema = 'https';
  req.requestTime = Date.now();
  return next();
});

app.get('/', (req, res) => {
  return res.render('index.html', {
    project_name: process.env.PROJECT_NAME,
    title: RP_NAME,
  });
});

app.use('/implicit', implicit);
app.use('/authz_code', authzCode);
app.use('/pkce', pkce);
app.use('/introspection', introspection);

const listener = app.listen(process.env.PORT || 8080, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
