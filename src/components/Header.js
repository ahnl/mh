import '../styles/header.css';
import { SocialMedias } from './SocialMedias';

export function Header() {
    return (
        <div className="header">
            <h1>
                Mikael<br />Hannolainen
            </h1>
            <div className="socialMediasArea">
                <SocialMedias />
            </div>
        </div>
    );
};