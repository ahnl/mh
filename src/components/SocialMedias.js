import '../styles/socialmedias.css';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; 

import InstagramIcon from '../images/icons/instagram.svg';
import SnapchatIcon from '../images/icons/snapchat.svg';
import LinkedinIcon from '../images/icons/linkedin.svg';
import GitHubIcon from '../images/icons/github.svg';
import EmailIcon from '../images/icons/email.svg';

const socialMediaData = [
    {
        name: "GitHub",
        icon: GitHubIcon,
        handle: "@ahnl",
        url: "https://github.com/ahnl"
    },
    {
        name: "Instagram",
        icon: InstagramIcon,
        handle: "@mikaelhnl",
        url: "https://instagram.com/mikaelhnl"
    },
    {
        name: "Snapchat",
        icon: SnapchatIcon,
        handle: "@mklrthn",
        url: "https://snapchat.com/add/mklrthn"
    },
    {
        name: "LinkedIn",
        icon: LinkedinIcon,
        handle: "Mikael Hannolainen",
        url: "https://www.linkedin.com/in/mikael-hannolainen/"
    },
    {
        name: "Email",
        icon: EmailIcon,
        handle: "mikael@hannolainen.com",
        url: "mailto:mikael@hannolainen.com"
    },
]

function SocialMediaItem({data}) {
    return (
        <li>
            <Tippy content={data.handle}>
                <a href={data.url} target="_blank" 
                rel="noreferrer">
                    <img src={data.icon} alt={data.name} />
                </a>
            </Tippy>
        </li>
    )
}

export function SocialMedias() {
    return (
        <ul className="socialMedias">
            {socialMediaData.map(item => (
                <SocialMediaItem key={item.name} data={item} />
            ))}
        </ul>
    )
}