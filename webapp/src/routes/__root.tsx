import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useMatch,
} from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import * as React from "react";
import type { QueryClient } from "@tanstack/react-query";
import { DefaultCatchBoundary } from "~/features/shared/components/DefaultCatchBoundary";
import { NotFound } from "~/features/shared/components/NotFound";
import appCss from "~/features/shared/styles/app.css?url";
import { seo } from "~/features/shared/utils/seo";
import NavBar from "~/features/ui/components/NavBar";
import Container from "~/features/ui/components/Container";
import Breadcrumb from "~/features/shared/components/Breacrumb";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title:
          "TanStack Start | Type-Safe, Client-First, Full-Stack React Framework",
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const links = [
    {
      to: "/",
      label: "Accueil",
    },
    {
      to: "/articles",
      label: "Articles",
    },
  ];

  const isHomePage = useMatch({ from: "/", shouldThrow: false });
  return (
    <html data-theme="default">
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="flex flex-col min-h-screen">
          <NavBar links={links} />
          <div className="flex-1 flex-col flex-grow">
            <Container>
              <Breadcrumb />
              <div className="py-8">{children}</div>
            </Container>
          </div>
          <footer className="footer footer-center p-10 bg-base-200 text-base-content">
            <div>
              <p>Copyright © {new Date().getFullYear()} - Tout droits réservés <span className="text-primary font-bold">Aideventure</span></p>
            </div>
          </footer>
          <TanStackRouterDevtools position="bottom-right" />
          <ReactQueryDevtools buttonPosition="bottom-left" />
          <Scripts />
        </div>
      </body>
    </html>
  );
}
