import {createFileRoute, Outlet} from '@tanstack/react-router'

const RouteComponent = () => <Outlet />;
export const Route = createFileRoute('/articles')({
  component: RouteComponent,
  loader: () => ({
    crumb: 'Posts',
  })
})