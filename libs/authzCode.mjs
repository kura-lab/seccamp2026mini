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
  return res.render('authz_code.html', {
    project_name: process.env.PROJECT_NAME,
    title: process.env.RP_NAME,
  });
});

/**
 * TODO: クライアントの設定
 */
const SERVER = 'http://localhost:18080/realms/master';
const CLIENT_ID = '';
const CLIENT_SECRET = '';
const REDIRECT_URI = 'http://localhost:8080/authz_code/callback';

router.get('/request-authorization', async (req, res) => {

  console.log('[[ authorization code flow started ]]');

  /**
   * TODO: OpenID Configurationの取得
   */


  /**
   * TODO: state、nonceの生成とセッションへの保存
   */


  /**
   * TODO: AuthorizationリクエストのURL生成とリダイレクト処理
   */


  return res.redirect(307, '/');
});

router.get('/callback', async (req, res) => {

  /**
   * TODO: OpenID Configurationの取得
   */


  /**
   * TODO: TokenエンドポイントからAccess Tokenを取得しPKCEを検証
   */


  /**
   * TODO: UserInfoエンドポイントからユーザー情報を取得
   */


  /**
   * TODO: セッション破棄
   */

  console.log('[[ authorization code flow finished ]]');

  return res.render('authz_code_callback.html', {
    project_name: process.env.PROJECT_NAME,
    title: process.env.RP_NAME,
    sub: '',
  });
});

export { router as authzCode };
