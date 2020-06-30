import Layout from '@/layout/index'
export default [
    {
        path: '/404',
        component: () => import('@/views/features/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/views/features/401'),
        hidden: true
    },
    {
        path: '/login',
        hidden: true,
        meta: { title: '登录' },
        component: () => import('@/views/login')
    },
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path*',
                component: () => import('@/views/features/redirect')
            }
        ]
    },
    {
        path: "/",
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                component: (resolve) => require(['@/views/home'], resolve),
                name: 'Dashboard',
                meta: { title: '首页', icon: 'index', affix: true, noCache: true }
            }
        ]
    },
]