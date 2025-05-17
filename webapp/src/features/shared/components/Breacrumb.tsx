import { Link, useMatch, useMatches } from "@tanstack/react-router";
import * as React from "react";

export default function Breadcrumb() {
  const isHomePage = useMatch({ from: "/", shouldThrow: false });
  const matches = useMatches({
    select: (state) =>
      state.map((match) => {
        return {
          id: match.id,
          routeId: match.pathname,
          crumb: match?.loaderData?.crumb,
        };
      }),
  });
  if (isHomePage) return null;

  const breadcrumbs = matches.filter((match) => match.crumb);

  return (
    <div className="breadcrumbs text-sm border-base-content border-b-[1px]">
      <ul>
        <li>
          <Link to={"/"}>Accueil</Link>
        </li>
        {breadcrumbs.map((item, index) => {
          return (
            <li key={item.id}>
              {index === breadcrumbs.length - 1 ? (
                <span className="font-bold">{item.crumb}</span>
              ) : (
                <Link to={item.routeId}>{item.crumb}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
