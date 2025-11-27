
// 常量路由
export const constantRoutes = [
    {
        // 登录页
        path: '/login',
        component: () => import("@/views/login/index.vue"),
        name: 'login', //命名路由
        // 路由原信息
        meta: {
            title: '登录', //路由标题
            isHidden: true //是否展示
        }
    },
    {
        // 首页布局页
        path: '/',
        redirect: '/home',
        component: () => import("@/layout/index.vue"),
        name: 'layout',
        meta: {
            isHidden: true
        },
        children: [
            {
                // 首页
                path: '/home',
                component: () => import("@/views/home/index.vue"),
                meta: {
                    title: '首页',
                    isHidden: false,
                    icon: 'House'
                }
            }
        ]
    },
    {
        // 数据大屏
        path: '/screen',
        component: () => import("@/views/screen/screen.vue"),
        meta: {
            title: '数据大屏',
            isHidden: false,
            icon: 'Platform'
        }
    },
    {
        // 404页面
        path: '/404',
        component: () => import("@/views/404/index.vue"),
        name: '404',
        meta: {
            title: '404',
            isHidden: true
        }
    },
    {
        // acl
        path: '/acl',
        redirect: '/acl/user',
        component: () => import("@/layout/index.vue"),
        name: 'acl',
        meta: {
            title: '权限管理',
            isHidden: false,
            icon: "Lock"
        },
        children: [
            {
                path: "/acl/user",
                component: () => import('@/views/acl/user/user.vue'),
                name: 'Acl',
                meta: {
                    title: '用户管理',
                    isHidden: false,
                    icon: "User"
                }
            },
            {
                path: "/acl/role",
                component: () => import('@/views/acl/role/role.vue'),
                name: 'Role',
                meta: {
                    title: '角色管理',
                    isHidden: false,
                    icon: "UserFilled"
                }
            },
            {
                path: "/acl/permission",
                component: () => import('@/views/acl/permission/permission.vue'),
                name: 'Permission',
                meta: {
                    title: '菜单管理',
                    isHidden: false,
                    icon: "Document"
                }
            }
        ]
    },
    {
        path: '/product',
        redirect: '/product/trademark',
        component: () => import('@/layout/index.vue'),
        name: 'Product',
        meta: {
            title: '商品管理',
            isHidden: false,
            icon: 'Goods'
        },
        children: [
            {
                path: '/product/trademark',
                component: () => import('@/views/product/trademark/trade-mark.vue'),
                name: 'TradeMark',
                meta: {
                    title: '品牌管理',
                    isHidden: false,
                    icon: 'ShoppingCart'
                }

            },
            {
                path: '/product/attr',
                component: () => import('@/views/product/attr/attr.vue'),
                name: 'Attr',
                meta: {
                    title: '属性管理',
                    isHidden: false,
                    icon: 'UserFilled'
                }

            },
            {
                path: '/product/spu',
                component: () => import('@/views/product/spu/spu.vue'),
                name: 'Spu',
                meta: {
                    title: 'SPU管理',
                    isHidden: false,
                    icon: 'Document'
                }

            },
            {
                path: '/product/sku',
                component: () => import('@/views/product/sku/sku.vue'),
                name: 'Sku',
                meta: {
                    title: 'SKU管理',
                    isHidden: false,
                    icon: 'Document'
                }

            },
        ]
    },
    {
        // 匹配任意路径
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        meta: {
            title: '任意路由',
            isHidden: true
        }
    }

]