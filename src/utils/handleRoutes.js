export default function filterAsyncRoutes(routes) {
  const finallyRoutes = [];
  routes.forEach((route) => {
    const item = { ...route };
    if (item.children) {
      item.children = filterAsyncRoutes(item.children);
    } else {
      finallyRoutes.push(item.name);
    }
  });
  return finallyRoutes;
}
