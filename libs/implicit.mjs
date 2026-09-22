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

import express from 'express';
import * as client from 'openid-client';
const router = express.Router();

router.get('/', (req, res) => {
  return res.render('implicit.html', {
    project_name: process.env.PROJECT_NAME,
    title: process.env.RP_NAME,
  });
});

/**
 * TODO: RPの設定
 */
const REDIRECT_URI = 'http://localhost:8080/implicit/callback';

router.get('/request-authorization', async (req, res) => {

  console.log('[[ implicit flow started ]]');

  /**
   * TODO: OPの設定取得
   */


  /**
   * TODO: AuthorizationリクエストのURL生成とリダイレクト処理
   */


  return res.redirect(307, '/');
});

router.get('/callback', (req, res) => {
  return res.render('implicit_callback.html', {
    project_name: process.env.PROJECT_NAME,
    title: process.env.RP_NAME,
  });
});

router.post('/login', async (req, res) => {

  /**
   * TODO: OPの設定取得
   */


  /**
   * TODO: UserInfoエンドポイントからユーザー情報を取得
   */


  console.log('[[ implicit flow started ]]');

  let response = {
    sub: '',
  };
  return res.json(response);
});

export { router as implicit };
