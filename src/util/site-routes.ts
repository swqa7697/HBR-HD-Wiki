interface RouteListItem {
  path: string;
  name: string;
}

export const navRoutes: RouteListItem[] = [
  { path: '/', name: '主页' },
  { path: '/gacha-history', name: '历史卡池' },
  { path: '/score-attack', name: '打分顶分记录' },
  { path: '/clock-tower', name: 'Hell钟楼解法' },
  { path: '/hard', name: '异时层解法' },
];

export const toolRoutes: RouteListItem[] = [
  { path: '/od-tool', name: 'OD计算器' },
  { path: '/dr-tool', name: '破坏率计算器' },
];

export const sitemapRoutes: RouteListItem[] = [
  ...navRoutes.slice(1),
  ...toolRoutes,
];
