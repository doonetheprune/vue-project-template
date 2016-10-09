/**
 * Created by ShaunBetts on 09-Apr-16.
 */

'use strict';

require('./page');
var page = require('./page.html');

import Vue from 'vue';

export const component = Vue.extend({
  template: page,
  ready() {
    console.log('Router', this.$router.get());
  }
});