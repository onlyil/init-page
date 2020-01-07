import {hybridAjax} from '@fe-base/ajax';

let request = (options) => new Promise((resolve, reject) => hybridAjax({
    apiURL: 'http://api.beicang.com/gateway/route.html',
    ...options,
    success(resp) {
        if (resp.success) {
            resolve(resp);
        } else {
            reject(resp.message || '请求失败');
        }
    },
    error(err) {
        reject(err);
    },
}));

const fetchUserInfo = (params) => request({
    type: 'GET',
    method: 'xretail.member.info.get',
    data: {
        ...params,
        _airborne_channel: 'xretail',
    },
});

export default {
    fetchUserInfo,
};
