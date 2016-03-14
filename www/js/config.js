"use strict";

 angular.module('starter.config', [])

.constant("$ionicLoadingConfig", {
  "template": "请求中..."
})

.constant("ENV", {
  "version": "1.0.0",
  "name": "development",
  "debug": true,
  "accessToken": "5efd60fd-68c2-4351-a9a0-10d8aa3c7a81",
  "domain": "http://ionichina.com",
  "api": "/api/v1"
});
