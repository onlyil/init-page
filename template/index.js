import App from './App.vue';
import './index.less';
import skynet from '@fe-base/skynet';
import LazyLoad from '@fe-vue/lazyload';
import loading from 'src/common/vue/plugins/loading/index';

Vue.use(loading);
Vue.use(LazyLoad, {
    placeholder: '//h0.hucdn.com/open201932/5f6a2aac25910dca_100x100.png',
});
skynet(32); // 配置并启动监控
/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    components: {
        App,
    },
});
