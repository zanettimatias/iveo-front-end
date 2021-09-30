import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'ar.com.mzanetti.iveo',
  appPath: 'app',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  }
} as NativeScriptConfig;