import Layout from '@/layout/Layout.vue';
export const asyncMenus = [{
    title: '功能模块',
    name: 'jobs',
    // eslint-disable-next-line global-require
    icon: require('../assets/img/gongnmk_icon@2x.png'),
    path: '',
    children: [{
        title: '开机模块',
        path: '/jobs/create',
        name: 'create',
        icon: '',
      },
      {
        title: '算法模块',
        path: '/functions',
        name: 'function',
        icon: '',
      },
      {
        title: '云超算',
        path: '/jobs/scc',
        name: 'cloud',
        icon: '',
      },
    ],
  },
  {
    title: '结果总览',
    name: 'result',
    // eslint-disable-next-line global-require
    icon: require('../assets/img/jieguo_icon@2x.png'),
    path: '',
    children: [{
        title: '任务总览',
        path: '/result/task',
        name: 'task',
        icon: '',
      },
      {
        title: '服务器总览',
        path: '/result/server',
        name: 'server',
        icon: '',

      },
      {
        title: '文件总览',
        path: '/result/file',
        name: 'file',
        icon: '',

      },
    ],
  },
  {
    title: '权限管理',
    name: 'admin',
    // eslint-disable-next-line global-require
    icon: require('../assets/img/quanxian_icon@2x.png'),
    path: '',
    children: [{
        title: '用户管理',
        path: '/admin/user_management',
        name: 'user',
        icon: '',
      },
      {
        title: '信息修改',
        path: '/admin/authority',
        name: 'authority',
        icon: '',
      },
    ],
  },
  {
    title: '财务分析',
    path: '',
    icon: require('../assets/img/caiwu_icon@2x.png'),
    name: 'business',
    children: [{
      title: '财务模块',
      path: '/business/businessModule/businessHome',
      name: 'businessModule',
      icon: '',
    }, ],
  },
];

export const asyncRouters = [{
    path: '/jobs',
    component: Layout,
    name: '',
    children: [{
        path: 'create',
        name: 'create',
        component: () => import( /* webpackChunkName: "about" */ '../views/CreateMachine'),
      },
      {
        path: 'function',
        redirect: '/jobs/function/dpkit',
        component: () => import( /* webpackChunkName: "about" */ '../views/function/Funtion'),
        children: [{
            path: 'dpkit',
            name: 'dpkit',
            component: () => import( /* webpackChunkName: "about" */ '../views/Dpkit.vue'),
          },
          {
            path: 'vasp',
            name: 'vasp',
            component: () => import( /* webpackChunkName: "about" */ '../views/Vasp.vue'),
          },
          {
            path: 'lammps',
            name: 'lammps',
            component: () => import( /* webpackChunkName: "about" */ '../views/Lammps.vue'),
          },
          {
            path: 'cp2k',
            name: 'cp2k',
            component: () => import( /* webpackChunkName: "about" */ '../views/Cp2k.vue'),
          },
          {
            path: 'lcurve',
            name: 'lcurve',
            component: () => import( /* webpackChunkName: "about" */ '../views/job/components/Lcurve.vue'),
          },
        ],
      },
      {
        path: 'scc',
        name: 'scc',
        component: () => import( /* webpackChunkName: "about" */ '../views/function/scc.vue'),
      },
    ],
  },
  {
    path: '/result',
    component: Layout,
    name: 'result',
    children: [{
        path: 'task',
        name: 'task',
        component: () => import('../views/result/taskResult.vue'),
      },
      {
        path: 'server',
        name: 'server',
        component: () => import('../views/result/serverResult.vue'),
      },
      {
        path: 'file',
        name: 'file',
        component: () => import('../views/result/fileResult.vue'),
      },
    ]
  },
  {
    path: '/admin',
    component: Layout,
    name: 'admin',
    children: [{
      path: 'user_management',
      name: 'user',
      component: () => import( /* webpackChunkName: "about" */ '@/views/admin/userManagement/userManagement.vue'),
    }, {
      path: 'authority',
      name: 'authority',
      component: () => import( /* webpackChunkName: "about" */ '../views/admin/authorityManagement/authorityManagement'),
    }, ]
  },
  {
    path: '/finance',
    component: () => import('@/layout/Layout'),
    children: [{
        path: 'wallet',
        name: 'wallet',
        component: () => import('@/views/finance/Wallet'),
      },
      {
        path: 'trades',
        name: 'trades',
        component: () => import('@/views/finance/Trades'),
      },
      {
        path: 'flows',
        name: 'flows',
        component: () => import('@/views/finance/Flows'),
      },
    ],
  },
  {
    path: '/business',
    component: Layout,
    name: 'business',

    children: [{
      path: 'businessModule',
      name: 'businessModule',
      component: () => import('@/views/business/businessModule'),
      children: [{
          path: 'businessHome',
          name: 'businessHome',
          component: () => import('@/views/business/businessHome'),
        },
        {
          path: 'fund',
          name: 'fund',
          component: () => import('@/views/business/fund/fund'),
          children: [{
              path: 'recharge',
              name: 'recharge',
              component: () => import('@/views/business/fund/recharge')
            },
            {
              path: 'rechargeRecord',
              name: 'rechargeRecord',
              component: () => import('@/views/business/fund/rechargeRecord')
            },
            {
              path: 'withdraw',
              name: 'withdraw',
              component: () => import('@/views/business/fund/withdraw')
            },
            {
              path: 'withdrawRecord',
              name: 'withdrawRecord',
              component: () => import('@/views/business/fund/withdrawRecord')
            },
            {
              path: 'voucher',
              name: 'voucher',
              component: () => import('@/views/business/fund/voucher')
            },
          ]
        }, {
          path: 'bill',
          name: 'bill',
          component: () => import('@/views/business/bill/bill'),
          children: [{
              path: 'expense',
              name: 'expense',
              component: () => import('@/views/business/bill/expense'),
            },
            {
              path: 'export',
              name: 'export',
              component: () => import('@/views/business/bill/export'),
            },
          ]
        },
        {
          path: 'invoice',
          name: 'invoice',
          component: () => import('@/views/business/invoice/invoice'),
        },
        {
          path: 'charging',
          name: 'charging',
          component: () => import('@/views/business/charging/charging'),
        },
      ]
    }, ]
  }
];

export const asyncFunctions = [{
    name: 'lammps',
    path: '/jobs/function/lammps',
    title: 'lammps',
  },
  {
    name: 'cp2k',
    path: '/jobs/function/cp2k',
    title: 'cp2k',
  },
  {
    name: 'vasp',
    path: '/jobs/function/vasp',
    title: 'vasp',
  },
  {
    name: 'dpkit',
    path: '/jobs/function/dpkit',
    title: 'deepmd-kit',
  },
  {
    name: 'lcurve',
    path: '/jobs/function/lcurve',
    title: 'lcurve',
  },
  {
    name: 'user_management',
    path: '/admin/user/user_management',
    title: '子用户管理',
  },
  {
    name: 'businessHome',
    path: '/business/businessModule/businessHome',
    title: '财务模块',
  },
  {
    path: '/business/businessModule/fund',
    name: 'fund',
    title: '资金管理',
    children: [{
        path: '/business/businessModule/fund/recharge',
        name: 'recharge',
        title: '充值',
      },
      {
        path: '/business/businessModule/fund/withdraw',
        name: 'withdraw',
        title: '提现',
      },
      {
        path: '/business/businessModule/fund/voucher',
        name: 'voucher',
        title: '代金券管理',
      },
    ],
  },
  {
    path: '/business/businessModule/bill',
    name: 'bill',
    title: '账单管理',
    children: [{
        path: '/business/businessModule/bill/expense',
        name: 'expense',
        title: '费用账单',
      },
      {
        path: '/business/businessModule/bill/export',
        name: 'export',
        title: '导出记录',
      },
    ]
  },
  {
    path: '/business/businessModule/invoice',
    name: 'invoice',
    title: '发票管理',
    children: [{
      path: '/business/businessModule/invoice',
      name: 'invoice',
      title: '发票管理',
    }]
  },
  {
    path: '/business/businessModule/charging',
    name: 'charging',
    title: '计费说明',
  },
];

export function parseRouter(routerTree, name) {
  for (const item of routerTree) {
    if (name === item.name) {
      return {
        path: item.path,
        component: item.component,
        name: item.name,
      };
    }
    if (item.children) {
      const tmpRouter = parseRouter(item.children, name);
      if (tmpRouter) {
        return {
          path: item.path,
          component: item.component,
          name: item.name,
          children: [tmpRouter],
        };
      }
    }
  }
  return null;
}

export function parseMenus(menuTree, menus) {
  const resMenu = [];
  for (const item of menuTree) {
    if (menus.indexOf(item.name) >= 0) {
      resMenu.push({
        path: item.path,
        title: item.title,
        name: item.name,
        icon: item.icon,
      });
    }
    if (item.children) {
      const tmpMenu = parseMenus(item.children, menus);
      if (tmpMenu.length > 0) {
        resMenu.push({
          path: item.path,
          title: item.title,
          name: item.name,
          icon: item.icon,
          children: tmpMenu,
        });
      }
    }
  }
  return resMenu;
}

export function parseMenusToTitle(menuTree, menus) {
  let resTitle = [];
  let tmpTitles = [];
  for (const item of menuTree) {
    if (menus.indexOf(item.name) >= 0) {
      resTitle.push(item.title);
    }

    if (item.children) {
      tmpTitles = parseMenusToTitle(item.children, menus);
      resTitle = resTitle.concat(tmpTitles);
    }
  }
  return resTitle;
}

export function parseFunctions(list) {
  const functions = [];
  for (const item of asyncFunctions) {

    if (list.indexOf(item.name) >= 0) {
      functions.push(item);
    }
  }
  return functions;
}