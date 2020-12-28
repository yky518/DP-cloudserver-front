import Layout from '@/layout/Layout.vue';

export const asyncMenus = [
  {
    title: '功能模块',
    name: 'jobs',
    // eslint-disable-next-line global-require
    icon: require('../assets/img/gongnmk_icon@2x.png'),
    path: '',
    children: [
      {
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
        path: '/jobs',
        name: 'cloud',
        icon: '',

      },
      // {
      //   title: 'Cp2k',
      //   path: '/jobs/cp2k',
      //   name: 'cp2k',
      //   icon: '',
      // },
      // {
      //   title: 'Lammps',
      //   path: '/jobs/lammps',
      //   name: 'lammps',
      //   icon: '',
      //
      // },
      // {
      //   title: 'Lcurve',
      //   path: '/jobs/lcurve',
      //   name: 'lcurve',
      //   icon: '',
      //
      // },
      // {
      //   title: 'Iter',
      //   name: '/jobs/iter',
      //   path: '/iter',
      //   icon: '',
      //
      // },
      // {
      //   title: 'Vasp',
      //   path: '/jobs/vasp',
      //   name: 'vasp',
      //   icon: '',
      //
      // },
    ],
  },
  {
    title: '权限管理',
    name: 'admin',
    // eslint-disable-next-line global-require
    icon: require('../assets/img/quanxian_icon@2x.png'),
    path: '',
    children: [
      {
        title: '用户管理',
        path: '/admin/user_management',
        name: 'user',
        icon: '',

      },
      {
        title: '角色管理',
        path: '/admin/role_management',
        name: 'role',
        icon: '',

      },
    ],
  },
  {
    title: '财务分析',
    path: '',
    icon: '../assets/img/caiwu_icon@2x.png',
    name: 'business',
    children: [
      {
        title: 'business',
        path: '/business/business',
        name: 'business',
        icon: '',

      },

    ],
  },
];

export const asyncRouters = [
  {
    path: '/jobs',
    component: Layout,
    name: '',
    children: [
      {
        path: 'create',
        name: 'create',
        component: () => import(/* webpackChunkName: "about" */ '../views/CreateMachine'),
      },
      {
        path: 'function',
        redirect: '/jobs/function/dpkit',
        component: () => import(/* webpackChunkName: "about" */ '../views/function/Funtion'),
        children: [
          {
            path: 'dpkit',
            name: 'dpkit',
            component: () => import(/* webpackChunkName: "about" */ '../views/Dpkit.vue'),
          },
          {
            path: 'vasp',
            name: 'vasp',
            component: () => import(/* webpackChunkName: "about" */ '../views/Vasp.vue'),
          },
          {
            path: 'lammps',
            name: 'lammps',
            component: () => import(/* webpackChunkName: "about" */ '../views/Lammps.vue'),
          },
          {
            path: 'cp2k',
            name: 'cp2k',
            component: () => import(/* webpackChunkName: "about" */ '../views/Cp2k.vue'),
          },

          {
            path: 'lcurve',
            name: 'lcurve',
            component: () => import(/* webpackChunkName: "about" */ '../views/job/components/Lcurve.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/admin',
    component: Layout,
    name: '',
    children: [
      {
        path: 'menu_management',
        name: 'menu',
        component: () => import('@/views/admin/menuManagement/MenuManagement'),
      },
      {
        path: 'user_management',
        name: 'user',
        component: () => import('@/views/admin/userManagement/userManagement'),
      },
      {
        path: 'role_management',
        name: 'role',
        component: () => import('@/views/admin/roleManagement/RoleManagement'),
      },
    ],
  },
  {
    path: '/finance',
    component: () => import('@/layout/Layout'),
    children: [
      {
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
];

export const asyncFunctions = [
  {
    name: 'lammps',
    path: '/jobs/function/lammps',
    title: 'Lammps',
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
    title: 'dpkit',
  },
  {
    name: 'lcurve',
    path: '/jobs/function/lcurve',
    title: 'lcurve',
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
