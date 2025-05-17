import {Link} from "@tanstack/react-router";
import Container from "~/features/ui/components/Container";

interface NavBarProps {
    links: {
        to: string;
        label: string;
    }[]
}

export default function NavBar(props: NavBarProps) {
    return <div className="navbar border-neutral border-b-[1px] lg:px-[15rem]">
        <div className="navbar-start">
            <Link to={'/'} className="text-xl font-bold text-primary">Aideventure</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
                {props.links.map((link, index) => {
                    return <li key={index}>
                        <Link to={link.to}>{link.label}</Link>
                    </li>
                })}
            </ul>
        </div>
{/*        <div className="navbar-end">
            <a className="btn btn-primary">Button</a>
        </div>*/}
    </div>
}