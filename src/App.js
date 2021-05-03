import './styles/App.css';
import { Spline } from 'react-spline';
import SPLINE_EXPORTED_SCENE from './scene.json';
import { Portfolio } from './components/Portfolio';
import { Header } from './components/Header';
import { portfolioData } from './data';
import { SocialMedias } from './components/SocialMedias';

function App() {
    return (
        <div className="App">
            <div>
                <Spline className="art" scene={SPLINE_EXPORTED_SCENE} />
                <div className="artBottomSafeZone"></div>
            </div>
            <div className="content">
                <Header />
                <Portfolio data={portfolioData} />
                <div className="centerText">
                    You may contact me for my full CV, with a more detailed work history. References upon a request.
                    <br /><SocialMedias />
                </div>
            </div>
        </div>
    );
}



export default App;
