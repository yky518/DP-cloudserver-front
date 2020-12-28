const permission = {
  account: [
    {
      path: '/account/password/modify',
      method: 'post',
    },
    {
      path: '/account/password/forget',
      method: 'post',
    },
    {
      path: '/account/regist',
      method: 'post',
    },
    {
      path: '/account/sub/add',
      method: 'post',
    },
    {
      path: '/account/modify',
      method: 'post',
    },
    {
      path: '/account/del',
      method: 'post',
    },
    {
      path: '/account/login',
      method: 'post',
    },
    {
      path: '/account/organization/modify',
      method: 'post',
    },
    {
      path: '/account/list',
      method: 'get',
    },
    {
      path: '/account/menu',
      method: 'get',
    },
    {
      path: '/account/organization/list',
      method: 'get',
    },
    {
      path: '/account/role/list',
      method: 'get',
    },
    {
      path: '/account/role/modify',
      method: 'get',
    },
    {
      path: '/account/role/del',
      method: 'post',
    },
    {
      path: '/account/loginout',
      method: 'post',
    },
    {
      path: '/account/code/verify',
      method: 'post',
    },

  ],
  business: [
    {
      path: '/business/invoice/modify',
      method: 'post',
    },
    {
      path: '/business/invoice/add',
      method: 'post',
    },
    {
      path: '/business/invoice/modify',
      method: 'get',
    },
  ],
  finance: [
    {
      path: '/finance/tenpay/native_pay_notify',
      method: 'get',
    },
    {
      path: '/finance/trades',
      method: 'get',
    },
    {
      path: '/finance/trade/status',
      method: 'get',
    },
    {
      path: '/finance/flows',
      method: 'get',
    },
    {
      path: '/finance/wallet/recharge',
      method: 'post',
    },
    {
      path: '/finance/trades',
      method: 'get',
    },
    {
      path: '/finance/trades',
      method: 'get',
    },
  ],

};

export default permission;
